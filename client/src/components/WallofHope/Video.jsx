// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getContents } from "../../actions/content";

import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

const VideoModal = ({ hideModal, url }) => {
  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "VideoModalPan") {
      hideModal();
    }
  };

  const getYouTubeID = (url) => {
    const regExp =
      /^.*(youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:(?:v|e)\/|(?:watch|embed(?:\/popup)?)(?:\.php)?\?v=|\/(?:[a-z]{2}\/)?video\/))([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }

    return null;
  };

  return (
    <div
      className="sm:w-[36rem] h-[16rem] sm:h-[24rem] flex bg-white rounded-md relative"
      onClick={handleClose}
    >
      <span
        className="absolute top-2 right-2 cursor-pointer text-black"
        onClick={hideModal}
      >
        <IoClose size={24} />
      </span>
      {url && <iframe
        src={`https://www.youtube.com/embed/${getYouTubeID(
          url
        )}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Upload"
        className="inline-block h-full w-full object-cover"
      />}
    </div>
  );
};

VideoModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default VideoModal;
