import { useEffect, useState } from "react";
import {useDispatch} from "react-redux"
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { LinkedinIcon } from "react-share";
// Uncomment the next line if avatar local import is needed
// import avatar from '../../assets/img/about/trustee.png';
import { FaRegUser } from "react-icons/fa";
import { clearLoading, setLoading } from "../../features/loadingSlice";

export default function Trustee() {
  const dispatch = useDispatch()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [trustees, setTrustees] = useState([]);

  const [fullName, setFullName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [title, setTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getTrustee();
  }, []);

  const getTrustee = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/trustee/get`);
      if (response.ok) {
        const trusteesData = await response.json();
        setTrustees(trusteesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
      setFilePath(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
      setFullName(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "linkedin") {
      setLinkedin(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("title", title);
    formData.append("linkedin", linkedin);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      dispatch(setLoading())
      const response = await fetch(`${backendUrl}/api/trustee/save`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const savedTrustee = await response.json();
        setTrustees([...trustees, savedTrustee]);
        setFullName("");
        setTitle("");
        setLinkedin("");
        setAvatar(null);
      } else {
        console.error("Failed to save trustee data");
      }
      dispatch(clearLoading())
    } catch (error) {
      console.error("An error occurred while saving trustee data:", error);
      dispatch(clearLoading())
    }
  };

  const handleDelete = (index) => {
    confirmAlert({
      title: "Delete!",
      message: "Are you sure to delete it?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              dispatch(setLoading());
              const response = await fetch(`${backendUrl}/api/trustee/delete`, {
                method: "POST",
                body: {id: trustees[index]._id}
              });
              if (response.ok) {
                setTrustees((trustee) => trustee.filter((trustee, no) => no !== index))
              }
              
              dispatch(clearLoading());
            } catch (error) {
              console.error("Error occurred while deleting the item:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("no"),
        },
      ],
    });
  }

  console.log(trustees);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-zinc-800 text-center text-4xl md:text-4xl xl:text-5xl 2xl:text-6xl py-4 font-montserrat">
        Our Board of Trustees
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        {/* Trustee Card */}
        {trustees.map((trustee, index) => (
          <div key={index} className="flex flex-col w-[16rem] items-center">
            <div className="w-full relative flex">
              <img
                src={
                  `${backendUrl}/${trustee.avatar}` || "path_to_default_image"
                }
                alt="Trustee Avatar"
                className="w-full h-[14rem]"
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
            <button onClick={() => handleDelete(index)} className="w-full py-1 rounded-sm bg-yellow-500 text-black">Delete</button>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <h1 className="text-zinc-800 text-4xl font-bold font-sans">New</h1>
        <div className="bg-white relative flex flex-col gap-2 w-[16rem] items-center shadow shadow-zinc-200 rounded-md">
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={handleUploadFile}
          />
          <label htmlFor="upload" className="cursor-pointer">
            {avatar ? (
              <img
                src={filePath}
                alt="Preview"
                className="w-[16rem] h-[9rem] object-cover rounded-md"
              />
            ) : (
              <div className="text-[5rem] p-[2rem]">
                <FaRegUser />
              </div>
            )}
          </label>
          <form className="w-full px-2 flex flex-col gap-1">
            <input
              type="url"
              name="linkedin"
              value={linkedin}
              required
              onChange={handleInputChange}
              className="w-full text-black bg-transparent border border-gray-300 rounded-md focus:outline-none px-2 py-1 focus:border-blue-600"
              placeholder="Linkedin URL"
            />
            <input
              type="text"
              name="fullName"
              value={fullName}
              required
              onChange={handleInputChange}
              className="w-full text-black bg-transparent border border-gray-300 rounded-md focus:outline-none px-2 py-1 focus:border-blue-600"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="title"
              value={title}
              required
              onChange={handleInputChange}
              className="w-full text-black bg-transparent border border-gray-300 rounded-md focus:outline-none px-2 py-1 focus:border-blue-600"
              placeholder="Title"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-sky-600 my-2 px-4 py-1 rounded-sm text-white text-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
