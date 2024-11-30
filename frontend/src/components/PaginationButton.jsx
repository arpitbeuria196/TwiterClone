import { useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

const PaginationButton = ({ onClick, direction, disabled }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div
      className={`w-11 h-11 bg-blue-500 rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer relative ${
        hovered ? "w-[160px] bg-gradient-to-r from-blue-500 to-indigo-500" : ""
      } ${active ? "bg-gradient-to-r from-blue-400 to-indigo-400" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={onClick} // Trigger the pagination action
      disabled={disabled} // Disable the button when necessary
    >
      {direction === "right" ? (
        <GrFormNextLink className={`text-white ${hovered ? "hidden" : ""}`} />
      ) : (
        <IoMdArrowRoundBack className={`text-white ${hovered ? "hidden" : ""}`} />
      )}
      <div
        className={`text-black text-sm font-semibold tracking-wide ${
          hovered ? "flex opacity-100 animate-fadeIn" : "hidden"
        }`}
      >
        {direction === "right" ? "Next" : "Previous"}
      </div>
    </div>
  );
};

export default PaginationButton;
