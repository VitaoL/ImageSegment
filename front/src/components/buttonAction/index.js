import React ,{useRef }  from "react";
import "./style.css";


const ButtonAction = ({
  id,
  classButton,
  dataToggle,
  title,
  dataContainer,
  icon,
  key,
  color,
  handleColor,
  funcDel = null
}) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  return (
    <button
      style={{ zIndex: 7 }}
      key={key}
      id={id}
      type="button"
      className={classButton + " buttonAction"}
      data-toggle={dataToggle}
      title={title}
      data-container={dataContainer}
      onClick={funcDel? () => console.log(ctx) : ()=> handleColor(color)}
    >
      <span className="iconImg">{icon}</span>
    </button>
  );
};

export default ButtonAction;
