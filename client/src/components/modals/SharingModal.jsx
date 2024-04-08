import PropTypes from "prop-types";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  // TelegramIcon,
  // TelegramShareButton,
  // LinkedinIcon,
  // LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";

const SharingModal = ({ hideModal }) => {
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "SharingModal-pan") {
      hideModal();
    }
  };

  const shareUrl = "https://api.alphahospice.org";
  const shareimage = "https://api.alphahospice.org/share.jpg";

  const handleEmailButtonClick = () => {
    setShowEmailMessage(true);
  };

  const shareByEmail = () => {
    var subject = "Check out this link!";
    var body =
      "I thought you might be interested in this link: " + window.location.href;
    var mailtoLink = "mailto:?subject=" + subject + "&body=" + body;
    window.location.href = mailtoLink;
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
            <EmailIcon size={32} round onClick={shareByEmail} />
            <label>Email</label>
          </div>
        </div>
      </div>

      {showEmailMessage && (
        <div className="email-message-modal">
          <div className="email-message">
            <p>
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
