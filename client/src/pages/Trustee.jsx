import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

import { LinkedinIcon } from "react-share";
import { useEffect, useState } from "react";

const Trustee = () => {
  const [trustees, setTrustees] = useState([]);
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    getTrustee();
  }, []);

  const getTrustee = async () => {
    try {
      const response = await fetch(`${base_URL}/api/trustee/get`);
      if (response.ok) {
        const trusteesData = await response.json();
        setTrustees(trusteesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center gap-4 pt-28 py-12 px-12 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64">
        <h1 className="text-zinc-800 text-center text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-montserrat">
          Our Board of Trustees
        </h1>
        <p className="text-zinc-700 text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl text-center font-raleway">
          Alpha Hospice welcomes you to join our mission of compassion and care
          as a volunteer. Your involvement. whether in providing emotional
          support, assisting with daily operations, or aiding in community
          outreach, can profoundly impact the lives of those we serve.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          {trustees &&
            trustees.length > 0 &&
            trustees.map((trustee, index) => (
              <div key={index} className="flex flex-col w-[16rem] items-center">
                <div className="w-full relative flex">
                  <img
                    src={
                      `${base_URL}/${trustee.avatar}` || "path_to_default_image"
                    }
                    alt="Trustee Avatar"
                    className="w-full h-[12rem] object-cover rounded-md"
                  />
                  {/* Ensure `LinkedinIcon` component usage is correct */}
                  <a href={trustee.linkedin} target="blank">
                    <LinkedinIcon className="absolute bottom-2 right-2 size-8 rounded-sm" />
                  </a>
                </div>
                <span className="text-black font-medium text-2xl">
                  {trustee.fullName}
                </span>
                <span className="text-black text-lg">{trustee.title}</span>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trustee;
