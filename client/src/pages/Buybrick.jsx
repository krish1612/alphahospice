import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { getBricks } from '../actions/brick';
import { createOrder } from '../actions/payment';
import { setAlertWithTimeout } from '../features/alert/alertSlice';
import { logout } from '../features/auth/authSlice';
import { setAlert } from '../features/alert/alertSlice';

// Import modal components
import IntroModal from '../components/modals/IntroModal';
import DonorInformationModal from '../components/modals/DonorInformationModal';
import DonorAddressModal from '../components/modals/DonorAddressModal';
import VideoModal from '../components/modals/VideoModal';
import DedicationFormModal from '../components/modals/DedicationFormModal';
import DedicationConfirmModal from '../components/modals/DedicationConfirmModal';
import BuyBrickModal from '../components/modals/BuyBrickModal';
import BrickInformationModal from '../components/modals/BrickInformationModal';
import SoldModal from '../components/modals/SoldModal';

// Import assets
import UserImg from '../assets/img/user.png';
import brickImage from '../assets/img/alpha_building_high_res.jpg';
import './Modal.css';
import { TiArrowLeftThick } from 'react-icons/ti';
import { MdCancel } from 'react-icons/md';
import { FcMenu } from 'react-icons/fc';
import { Oval } from 'react-loader-spinner';
import ProgressBar from '../components/ProgressBar';
import { selectAmount } from '../features/brick/brickSlice';
import { Menu, Transition } from '@headlessui/react';

const Buybrick = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Initialize bircks states
  useEffect(() => {
    dispatch(getBricks());
  }, [dispatch]);

  // Fetch brick states
  const { bricks, loading } = useSelector((state) => state.brick);
  const { amount } = useSelector((state) => state.brick.current);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Fetch payment states
  const { order } = useSelector((state) => state.payment);

  // Initialize container and image states
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  // Initialize zoom in and out variables
  const scaleUp = true;
  const src = brickImage;
  const zoomFactor = 8;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // ----------------------- Handle resize operations : Start ------------------------------------
  const handleResize = useCallback(() => {
    if (containerRef !== null) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setContainerWidth(width);
      setContainerHeight(height);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, [containerRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    )
      return 0;
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    );
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
  ]);

  const handleImageOnLoad = (image) => {
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => handleImageOnLoad(image);
    image.src = src;
  }, [src]);
  // ----------------------- Handle resize operations : End ------------------------------------

  // Initialize modal variables
  const [isBuyBrickModalOpen, setIsBuyBrickModalOpen] = useState(false);
  const [isBrickInfoModalOpen, setIsBrickInfoModalOpen] = useState(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [isSoldModalOpen, setIsSoldModalOpen] = useState(false);

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalContent, setModalContent] = useState(0);
  const [hovered, setHovered] = useState('');

  const handleBrickClick = (index) => {
    if (!bricks[index].sold) {
      setIsBrickInfoModalOpen(false);
      setIsSoldModalOpen(false);
      setClickedIndex(index);
      setIsBuyBrickModalOpen(true);
    } else {
      setIsBuyBrickModalOpen(false);
    }
  };

  const handlePanClick = (e) => {
    // Get the position of the clicked point
    const x = e.clientX;
    const y = e.clientY;

    // Set the position of the modal relative to the clicked point
    setModalPosition({ x: x + 10, y: y + 10 });
    if (x > 1000) setModalPosition({ x: x - 220, y: y });
    if (y > 600) setModalPosition({ x: x, y: y - 300 });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    //Close modal when right clicked
    setIsBuyBrickModalOpen(false);
    setIsSoldModalOpen(false);
    setClickedIndex(null);
  };

  const handleMouseOver = (e) => {
    if (bricks[e.target.id].sold && !isBuyBrickModalOpen && !isSoldModalOpen) {
      // Get the position of the clicked point
      const x = e.clientX;
      const y = e.clientY;

      // Set the position of the modal relative to the clicked point
      setModalPosition({ x: x + 10, y: y + 10 });
      if (x > 1000) setModalPosition({ x: x - 300, y: y });
      if (y > 600) setModalPosition({ x: x, y: y - 220 });
      setHovered(bricks[e.target.id]);
      setIsBrickInfoModalOpen(true);
    } else {
      setHovered(bricks[e.target.id]);
      setIsBrickInfoModalOpen(false);
    }
  };

  const handleBuyBrickButtonClick = () => {
    if (isAuthenticated) {
      setIsSlideModalOpen(true);
      setModalContent(1);
      setIsBuyBrickModalOpen(false);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setIsSlideModalOpen(false);
  };

  const handlePreviousModal = () => {
    setModalContent(modalContent - 1);
  };

  const handleNextModal = () => {
    setModalContent(modalContent + 1);
  };

  const handleSkipModal = (index) => {
    setModalContent(index);
  };

  const handleBuyBrick = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    dispatch(createOrder(amount));

    setIsSlideModalOpen(false);
  };

  useEffect(() => {
    if (order.order_id !== '') {
      const { amount, order_id, currency } = order;
      console.log(order_id);
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: amount,
        currency: currency,
        name: 'Soumya Corp.',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/success`,
            data
          );

          dispatch(
            setAlert({ alertType: 'success', content: result.data.msg })
          );
          
          

        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Alpha Hospice',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }, [order, dispatch]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleLogout = () => {
    dispatch(selectAmount(1));
    dispatch(logout());
    const successAlert = {
      alertType: 'success',
      content: 'Successfully signed out',
    };
    dispatch(setAlertWithTimeout(successAlert));
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const onChangeSearchInput = (e) => {
    if (e.target.value.length > 2) setSearch(e.target.value);
    else {
      setSearch('');
      setFiltered([]);
    }
  };

  useEffect(() => {
    if (search !== '') {
      const temp = bricks.filter((item) => {
        if (item.user) {
          return (
            (item.sold && item.user.profile.fullName.includes(search)) ||
            item.brick_id.includes(search)
          );
        } else {
          return item.sold && item.brick_id.includes(search);
        }
      });
      setFiltered(temp);
    }
  }, [search, bricks]);

  const renderBricks = () => {
    const colBricks = [];
    Array.from(Array(140).keys()).map((col) => {
      const colBrick = (
        <div key={col} className='flex flex-row w-full'>
          {Array.from(Array(250).keys()).map((row) => {
            const index = col * 250 + row;
            return (
              <button
                key={index}
                id={index}
                className={classNames(
                  'border-2 border-white rounded-md w-5 h-5',
                  index === clickedIndex ? 'bg-yellow-400' : 'bg-gray-100',
                  !filtered.includes(bricks[index]) &&
                    bricks[index].sold &&
                    'opacity-0',
                  isSoldModalOpen && clickedIndex == index && 'bg-white',
                  filtered.includes(bricks[index]) && 'bg-red-400 custom-shadow'
                )}
                onClick={() => handleBrickClick(index)}
                onMouseOver={handleMouseOver}
              />
            );
          })}
        </div>
      );
      colBricks.push(colBrick);
    });
    return colBricks;
  };

  return (
    <div className='text-center items-center h-screen min-w-[500px] bg-gray-600 w-full flex itmes-center sm:justify-center'>
      <div className='fixed top-12 sm:right-16 md:right-20 lg:right-24 xl:right-36 flex justify-around p-3 itmes-center min-w-[400px] z-10'>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change px-3 rounded-lg hover:border-2 hover:border-sky-700'>
            <FcMenu className='text-4xl' />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute left-0 top-12 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-left text-sm'
                    )}
                  >
                    Home
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/about'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-left text-sm'
                    )}
                  >
                    About Us
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/beneficiaries'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-left text-sm'
                    )}
                  >
                    Beneficiaries
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/contact'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-left text-sm'
                    )}
                  >
                    Contact Us
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className='flex items-center mx-4'>
          <input
            type='search'
            className='border-2 border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-gray-200 outline-none focus-visible:border-sky-700'
            placeholder='Search the Wall of Hope'
            onChange={onChangeSearchInput}
          />
        </div>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn rounded-full'>
            <img
              src={UserImg}
              className='h-10 hover:border-2 border-sky-700 rounded-full'
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 top-12 z-10 mt-2 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {isAuthenticated
                  ? ({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full rounded-md'
                        )}
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    )
                  : ({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full rounded-md'
                        )}
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <ProgressBar />

      {isBuyBrickModalOpen && (
        <BuyBrickModal
          modalPosition={modalPosition}
          clickedIndex={bricks[clickedIndex].brick_id}
          handleBuyBrickButtonClick={handleBuyBrickButtonClick}
        />
      )}
      {isBrickInfoModalOpen && (
        <BrickInformationModal
          brickInfo={hovered}
          modalPosition={modalPosition}
        />
      )}
      {isSoldModalOpen && (
        <SoldModal
          brick_id={bricks[clickedIndex].brick_id}
          modalPosition={modalPosition}
        />
      )}
      {isSlideModalOpen && modalContent !== 0 && (
        <div className='modal'>
          <div className='modal-content flex-col flex justify-center items-center relative'>
            <TiArrowLeftThick
              className='modal-previous-button text-2xl hover:cursor-pointer'
              onClick={handlePreviousModal}
            />

            <MdCancel
              className='modal-close-button text-2xl hover:cursor-pointer'
              onClick={handleCloseModal}
            />
            {modalContent === 1 && (
              <IntroModal handleSkipModal={handleSkipModal} />
            )}
            {modalContent === 2 && (
              <DonorInformationModal handleNextModal={handleNextModal} />
            )}
            {modalContent === 3 && (
              <DonorAddressModal handleNextModal={handleNextModal} />
            )}
            {modalContent === 4 && (
              <VideoModal handleNextModal={handleNextModal} />
            )}
            {modalContent === 5 && (
              <DedicationFormModal
                handleNextModal={handleNextModal}
                brick_id={bricks[clickedIndex].brick_id}
              />
            )}
            {modalContent === 6 && (
              <DedicationConfirmModal handleBuyBrick={handleBuyBrick} />
            )}
          </div>
        </div>
      )}
      <div
        className='w-full h-full bg-gray-400 flex justify-center items-center relative'
        ref={containerRef}
        onClick={handlePanClick}
        onContextMenu={handleRightClick}
      >
        {imageScale > 0 && (
          <TransformWrapper
            key={`${imageNaturalWidth}x${imageNaturalHeight}`}
            initialScale={1}
            minScale={imageScale}
            maxScale={zoomFactor * imageScale}
            centerOnInit
            wheel={{ smoothStep: 0.004 }}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <div className='relative' onClick={handlePanClick}>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                  {loading ? (
                    <div className='flex left-0 top-0 w-full h-full bg-gray-300 opacity-95 justify-center items-center absolute z-1000'>
                      <Oval
                        height={80}
                        width={80}
                        color='#0369a1'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor='#0369a1'
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    renderBricks()
                  )}
                  {/* {<CircularProgress disableShrink />} */}
                </div>
                <img
                  src={brickImage}
                  className='absoulte top-0 left-0 max-w-none'
                  style={{
                    width: `5000px`,
                    height: `2800px`,
                  }}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </div>
  );
};

export default Buybrick;
