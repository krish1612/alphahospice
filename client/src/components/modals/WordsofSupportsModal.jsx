import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertWord } from "../../actions/support";
import { setAlert } from "../../features/alertSlice";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";

import WordsofSupportModalImg from "../../assets/img/WallofHope/words_modal.png";

const WordsofSupportsModal = ({ hideModal }) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.auth);

  // Initialize userId
  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
    } else {
      setUserId(null);
    }
  }, []);

  const handleSubmit = () => {
    if (message) {
      const supportWordData = {
        message,
        user: userId,
      };
      dispatch(insertWord(supportWordData));
      setMessage("");
      hideModal();
    } else {
      dispatch(
        setAlert({ alertType: "error", content: "Please feel all inputs." })
      );
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "wordsModal-pan") {
      hideModal();
    }
  };

  return (
    <div
      id="wordsModal-pan"
      className="fixed flex h-full w-full overflow-y-auto justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="w-5/6 sm:w-[48rem] h-1/2 sm:h-[32rem] flex bg-white shadow-md shadow-gray-500 rounded-md relative">
        <IoClose
          className="absolute top-4 right-4 cursor-pointer w-8 h-8"
          onClick={() => hideModal()}
        />
        <div className="w-1/2 hidden lg:flex">
          <img
            src={WordsofSupportModalImg}
            loading="lazy"
            className="rounded-l-md object-cover w-full h-full"
          />
        </div>
        <div className="w-full sm:w-1/2 h-full px-8 md:px-12 py-12 flex flex-col justify-evenly rounded-r-md items-center gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-2xl sm:text-[2rem] font-montserrat font-bold">
              Words of Support
            </p>
            <p className="w-full text-center text-gray-600 text-[0.8rem]">
              You&rsquo;re a hero! Thank you for supporting our hospice
              initiative. Can you help inspire others to join this initiative by
              sharing a few words of support?
            </p>
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-16 max-h-32 h-[8rem] p-2 border border-gray-200 focus:border-purple-600 outline-none rounded-sm"
          />
          <button
            onClick={handleSubmit}
            className="px-[4rem] py-[0.2rem] rounded-lg border-2 border-sky-700 hover:bg-sky-800 hover:text-white font-montserrat text-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

WordsofSupportsModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default WordsofSupportsModal;
