import React, { useState } from "react";
import ButtonAction from "../buttonAction";
import "./style.css";
import { BsPencil, BsEraser, BsTrash, BsEye, BsReply } from "react-icons/bs";
const allButtons = [
  {
    id: "drawOTool",
    classButton: "btn btn-default active",
    title: "Click in the object to segment.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsPencil size={20} />,
  },
  {
    id: "drawBTool",
    classButton: "btn btn-default",
    title: "Click in the Background.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsPencil size={20} />,
  },
  {
    id: "eraserTool",
    classButton: "btn btn-default",
    title: "Click to erase.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsEraser size={20} />,
  },
  {
    id: "undoTool",
    classButton: "btn btn-default",
    title: "Undo last action.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsReply size={20} />,
  },
  {
    id: "clearTool",
    classButton: "btn btn-default",
    title: "Erase everything..",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsTrash size={20} />,
  },
  {
    id: "sailencyTool",
    classButton: "btn btn-default active",
    title: 'See as the machine (aka "saliency map").',
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsEye size={20} />,
  },
  {
    id: "settingsTool",
    classButton: "btn btn-default",
    title: "Show settings.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsEraser size={20} />,
  },
];

const Header = () => {
  const [title, setTitle] = useState("Undefined");

  return (
    <div className="Header">
      <input
        className="title"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{ width: `${title.length + 1}ch` }}
      />
      <div className="buttons">
        {allButtons.map((element, index) => {
          return (
            <ButtonAction
              key={index}
              id={element.id}
              classButton={element.classButton}
              title={element.title}
              dataToggle={element.dataToggle}
              dataContainer={element.dataContainer}
              icon={element.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Header;
