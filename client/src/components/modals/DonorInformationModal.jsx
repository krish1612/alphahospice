import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { addDonorInfo } from "../../features/donorSlice";
import { FaAnglesRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const DonorInformationModal = ({ handleNextModal }) => {
  const [fullName, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    pan: "",
  });

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const { fullName, email } = jwtDecode(token);
      setName(fullName);
      setEmail(email);
    } else {
      setName(null);
      setEmail(null);
    }
  }, [token]);

  const donor = useSelector((state) => state.donor);

  useEffect(() => {
    if (donor.donorInfo) {
      const { mobile, pan, aadhaar } = donor.donorInfo;
      setMobile(mobile);
      setPan(pan);
      setAadhaar(aadhaar);
    }
  }, [donor]);

  const dispatch = useDispatch();

  function isValidNumber(mobile) {
    const regex = /^[0-9]{8,}$/;
    return regex.test(mobile);
  }
  // Make sure validateEmail function is defined
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isValidPAN(pan) {
    const regex = /^[A-Z, a-z]{5}[0-9]{4}[A-Z]$/;
    return regex.test(pan.toUpperCase());
  }

  const handleSubmit = () => {
    // Initialize an errors object
    let newErrors = {};

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate Mobile Number
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidNumber(mobile)) {
      newErrors.mobile = "Please enter a valid phone number";
    }

    //Validate PAN Number
    // if (!pan.trim()) {
    //   newErrors.pan = "PAN number is required";
    // } else
    if (pan.trim()) {
      if (!isValidPAN(pan)) {
        newErrors.pan = "Please enter a valid PAN number";
      }
    }
    // Update the errors state
    setErrors(newErrors);

    // If there are no errors, proceed to dispatch the data and handle the next modal
    if (Object.keys(newErrors).length === 0) {
      const infoData = {
        fullName,
        mobile,
        email,
        pan: pan.toUpperCase(),
        aadhaar,
      };
      dispatch(addDonorInfo(infoData));
      handleNextModal();
    }
  };

  const handleFocus = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <p className="text-4xl font-montserrat px-8">Donor Information</p>
      <p className="font-raleway text-xl my-4">Why we need this?</p>
      <p className="font-raleway text-xl my-4">
        You have taken a step towards making a significant difference!
      </p>

      <input
        type="text"
        name="fullName"
        value={fullName}
        onChange={(e) => setName(e.target.value)}
        onFocus={handleFocus}
        className={classNames(
          "bg-gray-100 border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.fullName && "border-red-400"
        )}
        placeholder="Full Name"
        disabled
      />
      {errors.fullName && (
        <p className="text-red-400 text-xs text-left w-2/3">
          {errors.fullName}
        </p>
      )}

      <input
        type="email"
        name="email"
        value={email}
        onFocus={handleFocus}
        onChange={(e) => setEmail(e.target.value)}
        className={classNames(
          "bg-gray-100 border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.email && "border-red-400"
        )}
        placeholder="Email ID"
        disabled
      />
      {errors.email && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.email}</p>
      )}

      <input
        type="tel"
        name="mobile"
        value={mobile}
        onFocus={handleFocus}
        onChange={(e) => setMobile(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.mobile && "border-red-400"
        )}
        placeholder="Mobile"
      />
      {errors.mobile && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.mobile}</p>
      )}

      <input
        type="text"
        name="pan"
        value={pan}
        onFocus={handleFocus}
        onChange={(e) => setPan(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.pan && "border-red-400"
        )}
        placeholder="PAN"
      />
      {errors.pan && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.pan}</p>
      )}

      <input
        type="text"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        className="border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2"
        placeholder="Aadhaar ID"
      />
      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 px-6 py-2 my-4 rounded-md"
        onClick={handleSubmit}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          ADD ADDRESS <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

DonorInformationModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
};

export default DonorInformationModal;
