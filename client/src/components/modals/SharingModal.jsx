import PropTypes from "prop-types";

import {
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SharingModal = ({ hideModal }) => {
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "SharingModal-pan") {
      hideModal();
    }
  };

  const messageClose = (e) => {
    if (e.target.id === "email-message-container") {
      setShowEmailMessage(false);
    }
  };

  const shareUrl = "https://api.alphahospice.org";
  // const shareimage = "https://api.alphahospice.org/share.jpg";

  const shareText =
    "Welcome to the Wall of Hope, a visual representation of collective support and compassion at Alpha Hospice. Each brick you see is a chance to contribute meaningfully. By clicking on a virtual brick, you can personalize it with your message or dedication and then proceed with your donation. Your participation not only aids in building our hospice but also weaves your story into our community tapestry. Join us in this significant endeavor-every brick, every contribution, brings us closer to realizing our shared vision of care and dignity.";

  const shareByEmail = () => {
    var subject = "Check out this link!";
    var body =
      "I thought you might be interested in this link: " + window.location.href;
    var mailtoLink = "mailto:?subject=" + subject + "&body=" + body;
    window.location.href = mailtoLink;
    setShowEmailMessage(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareText) // Use Clipboard API for modern browsers
      .then(() => {
        setShowEmailMessage(false);
        toast.success("Copied successfully!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard: ", err);
        // Fallback to document.execCommand('copy') for older browsers if needed
      });
  };

  return (
    <div
      id="SharingModal-pan"
      className="fixed flex justify-center items-center w-full h-full top-0 left-0"
      onClick={handleClose}
      style={{ zIndex: 990 }}
    >
      <div
        className="bg-white shadow-md shadow-gray-300 rounded-md absolute p-5 w-[320px] flex flex-col gap-3 items-center"
        style={{ zIndex: 999 }}
      >
        <div className="w-full flex justify-between">
          <p className="text-xl text-start font-bold mt-5 px-8">
            Help by Sharing...
          </p>
          <IoCloseCircleOutline
            onClick={() => hideModal()}
            size={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            {/* Assuming that socialData['Facebook'] has already been set */}
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <label htmlFor="facebook">Facebook</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <TwitterShareButton id="twitter" url={shareUrl}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <label htmlFor="Twitter" className="">
              Twitter
            </label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <label>Whatsapp</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <EmailIcon
              size={32}
              round
              onClick={shareByEmail}
              className=" cursor-pointer"
            />
            <label>Email</label>
          </div>
        </div>
      </div>
      <ToastContainer />
      {showEmailMessage && (
        <div
          id="email-message-container"
          className="w-full h-full absolute top-0 left-0 flex items-center justify-end px-36 bg-gray-100/50"
          style={{ zIndex: 999 }}
          onClick={messageClose}
        >
          <div className="email-message w-80 h-64 p-4 overflow-y-auto scroll-hidden bg-gray-800/80 rounded-md flex flex-col">
            <span>
              <IoIosCopy
                onClick={copyToClipboard}
                size={24}
                className="cursor-pointer text-white text-2xl"
              />
            </span>
            <p id="textToCopy" className="text-white">
              Welcome to the Wall of Hope, a visual representation of collective
              support and compassion at Alpha Hospice. Each brick you see is a
              chance to contribute meaningfully. By clicking on a virtual brick,
              you can personalize it with your message or dedication and then
              proceed with your donation. Your participation not only aids in
              building our hospice but also weaves your story into our community
              tapestry. Join us in this significant endeavor-every brick, every
              contribution, brings us closer to realizing our shared vision of
              care and dignity.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

SharingModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default SharingModal;
