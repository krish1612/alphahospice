import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

import WhiteLogo from "../../assets/img/logo-white.png";

const AdminLayout = () => {
  return (
    <div className="w-full h-[100vh] flex flex-wrap">
      {/* Header */}
      <div className="w-full h-12 px-4 flex sm:hidden justify-between items-center bg-zinc-800">
        <Link
          to="/"
          className="flex justify-center item font-bold font-raleway w-16"
        >
          <img src={WhiteLogo} className="" />
        </Link>
        <Menu
          as="div"
          className="relative flex justify-center itmes-center sm:order-5"
        >
          <Menu.Button className="w-8 md:w-12 h-10 md:h-12 btn btn-change px-1 mt-1 md:mt-0 rounded-full">
            <GiHamburgerMenu className="w-full h-full text-gray-600 hover:text-sky-700 md:mt-0" />
          </Menu.Button>
          <Menu.Items className="absolute w-44 flex flex-col items-center right-0 top-12 z-10 mt-2 p-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link
                to="/admin/bricks"
                className="bg-gray-100 text-gray-900 block w-full py-2 text-center text-sm"
              >
                Brkcks
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/admin/donors"
                className="bg-gray-100 text-gray-900 block w-full py-2 text-center text-sm"
              >
                Donors
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/admin/trustee"
                className="bg-gray-100 text-gray-900 block w-full py-2 text-center text-sm"
              >
                Trustee
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:w-1/5 bg-[#32363f] shadow-xl shadow-gray-900 text-white items-center">
        <Sidebar />
      </div>
      <div className="w-full bg-gray-100 lg:w-4/5 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 sm:py-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
