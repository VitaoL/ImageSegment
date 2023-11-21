import React, { useState } from "react";
import ButtonAction from "../buttonAction";
import "./style.css";
import { BsPencil, BsEraser, BsTrash, BsEye, BsReply } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/colorSlice";
import { clearAll } from "../../functions/draw.js";
import SliderWidth from "../sliderWidth/index.js";

const buttonsMarkersAndEraser = [
  {
    id: "drawOTool",
    classButton: "btn btn-default active",
    title: "Click in the object to segment.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsPencil size={20} />,
    color: "#00FF00",
  },
  {
    id: "drawBTool",
    classButton: "btn btn-default",
    title: "Click in the Background.",
    dataToggle: "tooltip",
    dataContainer: "body",
    icon: <BsPencil size={20} />,
    color: "#FF0000",
  },
  {
    id: "eraserTool",
    classButton: "btn btn-default",
    title: "Click to erase.",
    dataToggle: "tooltip",
    dataContainer: "body",
    color: "#000000",
    icon: <BsEraser size={20} />,
  },
];

const allButtons = [
  {
    id: "undoTool",
    classButton: "btn btn-default",
    title: "Undo last action.",
    dataToggle: "tooltip",
    dataContainer: "body",
    funcDel: () => clearAll(),
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

const Menu = () => {
  const [title, setTitle] = useState("Undefined");
  const dispatch = useDispatch();

  const handleColor = (color) => {
    dispatch(changeColor(color));
  };

  return (
    <div className="menuCointainer">
      <ul className="menuIconList">
        <li className="menuIconItem">
          {buttonsMarkersAndEraser.map((element, index) => {
            return (
              <ButtonAction
                key={index}
                id={element.id}
                classButton={element.classButton}
                title={element.title}
                dataToggle={element.dataToggle}
                dataContainer={element.dataContainer}
                icon={element.icon}
                color={element.color}
                handleColor={handleColor}
              />
            );
          })}
        </li>
        <li className="menuIconItem">
          <SliderWidth />
        </li>
        <li className="menuIconItem">
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
                handleColor={handleColor}
                funcDel={element.funcDel}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
