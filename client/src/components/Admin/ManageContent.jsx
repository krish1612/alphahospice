import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContents, updateContent } from "../../actions/content";

const ManageContent = () => {
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.content);

  const [video1, setVideo1] = useState(""); // Initialize state with the value from Redux
  const [video2, setVideo2] = useState(""); // Initialize state with the value from Redux

  useEffect(() => {
    dispatch(getContents());
  }, [dispatch]);

  useEffect(() => {
    if(contents.HOPVideo1 !== "") setVideo1(contents.HOPVideo1)
    if(contents.HOPVideo2 !== "") setVideo2(contents.HOPVideo2)
  }, [contents])

  const handleSave = (fieldName) => {
    let contentData = {};
    if (fieldName === "HOPVideo1") {
      contentData = { name: "HOPVideo1", content: video1 };
    } else if (fieldName === "HOPVideo2") {
      contentData = { name: "HOPVideo2", content: video2 };
    }
    dispatch(updateContent(contentData));
  };
  
  return (
    <div className="pt-12 w-full">
      <div className="w-full flex flex-col bg-gray-200 gap-2 p-3 text-black">
        <div className="w-full flex flex-col">
          <label htmlFor="video1">Wall of Hope Video-1</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex flex-1 px-4 py-2"
              value={video1}
              onChange={(e) => setVideo1(e.target.value)}
            />
            <button
              className="px-4 py-2 text-black bg-yellow-500"
              onClick={() => handleSave("HOPVideo1")}
            >
              Save
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="video2">Wall of Hope Video-2</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex flex-1 px-4 py-2"
              value={video2}
              onChange={(e) => setVideo2(e.target.value)}
            />
            <button
              className="px-4 py-2 text-black bg-yellow-500"
              onClick={() => handleSave("HOPVideo2")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
