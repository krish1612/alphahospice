import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setAmountOfReduce } from "../../features/brickSlice";
import { addDonorInfo } from "../../features/donorSlice";
import { CountryDropdown } from "react-country-region-selector";
import { FaAnglesRight } from "react-icons/fa6";
import { useEffect, useState } from "react";

const IntroModal = ({ handleNextModal }) => {
  const dispatch = useDispatch();
  const donor = useSelector((state) => state.donor);

  const [amount, setAmount] = useState(1);
  const [userLocation, setUserLocation] = useState(0);
  const [country, setCountry] = useState("Singapore");

  const locations = [
    "I am a Resident Indian",
    "I am a Non-Resident Indian",
    "I am a Foreign National",
  ];

  useEffect(() => {
    if (donor.donorInfo) {
      const { location, country } = donor.donorInfo;
      if (location) {
        setUserLocation(locations.findIndex((loc) => loc === location));
      }
      if (country) setCountry(country);
    }
  }, [donor]);

  const handleAmount = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue === "" || /^[0-9]+$/.test(newValue)) {
      setAmount(Math.min(newValue, 40000));
    }
  };
  const handleIncreaseAmount = () => {
    if (amount < 40000) {
      setAmount(amount + 1);
    }
  };

  const handleDecreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const handleChangeLocation = (e) => {
    setUserLocation(e.target.value);
  };
  const handleReadyPay = () => {
    const donoInfo = { location: locations[userLocation], country: country };
    dispatch(setAmountOfReduce(amount));
    dispatch(addDonorInfo(donoInfo));
    handleNextModal();
  };

  return (
    <>
      <p className="text-2xl sm:text-4xl font-medium font-montserrat px-8">
        Congratulations!
      </p>
      <p className="font-raleway text-md sm:text-xl my-4">
        You have taken a step towards making a significant difference!
      </p>
      <p className="font-raleway text-md sm:text-xl mt-4">
        How many bricks would you like to contribute to our Wall of Hope?
      </p>
      <div className="w-40 flex justify-between items-center border border-gray-800 rounded-md px-3 my-6">
        <button className="text-xl mb-0.5" onClick={handleDecreaseAmount}>
          -
        </button>
        {/* <span className="flex items-center border px-8 py-1 h-2/3 bg-gray-300 text-lg">
          {amount}
        </span> */}
        <input
          type="text"
          min={1}
          max={40000}
          value={amount}
          className="w-24 border px-2 py-2 h-2/3 outline-none focus:border focus:border-sky-400 bg-gray-300 text-lg text-center"
          onChange={(e) => handleAmount(e)}
        />
        <button className="text-xl mb-0.5" onClick={handleIncreaseAmount}>
          +
        </button>
      </div>
      <div className="flex flex-col">
        <p className="font-montserrat text-2xl">Contribution</p>
        <p className="font-raleway text-xl">₹ {1000 * amount}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <select
          className="border px-2 py-2 mt-6 cursor-pointer border-gray-400 rounded-md focus:outline-none"
          onChange={handleChangeLocation}
          value={userLocation}
        >
          {locations.map((location, index) => {
            return (
              <option key={index} value={index} className="py-2">
                {location}
              </option>
            );
          })}
        </select>
        {userLocation > 0 && (
          <CountryDropdown
            className="border border-gray-400 rounded-md w-4/5 sm:w-2/3 px-4 py-1.5 sm:py-2 focus:outline-none"
            name="country"
            value={country}
            onChange={(val) => setCountry(val)}
          />
        )}
      </div>
      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 w-4/5 flex justify-center py-1.5 sm:py-2 rounded-md mt-4"
        onClick={handleReadyPay}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          READY TO PAY <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

IntroModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
};

export default IntroModal;
