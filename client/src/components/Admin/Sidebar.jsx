import { Link } from "react-router-dom";

import { HiOutlineUsers } from "react-icons/hi2";
import { BsBricks } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { PiUserPlusThin } from "react-icons/pi";
import { PiVideoFill } from "react-icons/pi";
// import { GoFileMedia } from "react-icons/go";

import { FaShare } from "react-icons/fa";

import WhiteLogo from "../../assets/img/logo-white.png";

const Sidebar = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#32363f] text-white items-center">
      <Link
        to="/"
        className="flex justify-center item font-bold font-raleway text-center lg:text-2xl 2xl:text-3xl"
      >
        <img src={WhiteLogo} className="p-16" />
      </Link>
      <hr className="w-full border-gray-500" />
      <div className="w-full flex flex-col gap-4 py-8 lg:pl-6 xl:pl-10 2xl:pl-16 text-white">
        <Link
          to="/admin"
          className="flex items-center gap-3 cursor-pointer hover:text-sky-500"
        >
          <LuLayoutDashboard />
          <span className="text-md xl:text-lg 2xl:text-xl font-montserrat">
            Dashboard
          </span>
        </Link>
        <Link
          to="/admin/bricks"
          className="flex items-center gap-3 cursor-pointer hover:text-sky-500"
        >
          <BsBricks />
          <span className="text-md xl:text-lg 2xl:text-xl font-montserrat">
            Bricks
          </span>
        </Link>
        <Link
          to="/admin/donors"
          className="flex items-center gap-3 cursor-pointer hover:text-sky-500"
        >
          <HiOutlineUsers />
          <span className="text-md xl:text-lg 2xl:text-xl font-montserrat">
            Donors
          </span>
        </Link>
        <Link
          to="/admin/trustee"
          className="flex items-center gap-3 cursor-pointer hover:text-sky-500"
        >
          <PiUserPlusThin />
          <span className="text-md xl:text-lg 2xl:text-xl font-montserrat">
            Trustees
          </span>
        </Link>

        <Link
          to="/admin/manage"
          className="flex items-center gap-3 cursor-pointer hover:text-sky-500"
        >
          <PiVideoFill />
          <span className="text-md xl:text-lg 2xl:text-xl font-montserrat">
            Manage Content 
          </span>
        </Link>

        <div className="flex items-center gap-3 cursor-pointer relative">
          <Link to="/admin/smm" className="flex gap-2 items-center">
            <FaShare />
            <span className="text-md xl:text-lg 2xl:text-xl font-montserrat select-none hover:text-sky-500">
              SMM Manager
            </span>
          </Link>
            <ul className="flex flex-col gap-2 absolute top-10 left-6">
              <li className="flex items-center gap-2 select-none hover:text-sky-500">
                <FaFacebookSquare />
                <span className="text-lg">FacebookSquare</span>
              </li>
              <li className="flex items-center gap-2 select-none hover:text-sky-500">
                <FaWhatsapp />
                <span className="text-lg">Whatsapp</span>
              </li>
              <li className="flex items-center gap-2 select-none hover:text-sky-500">
                <FaLinkedin />
                <span className="text-lg">Linkedin</span>
              </li>
              <li className="flex items-center gap-2 select-none hover:text-sky-500">
                <FaTwitter />
                <span className="text-lg">Twitter</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
