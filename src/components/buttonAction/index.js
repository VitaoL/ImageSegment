import React from "react";
import "./style.css";

const ButtonAction = ({
  id,
  classButton,
  dataToggle,
  title,
  dataContainer,
  icon,
  key,
  handleColor,
}) => {
  return (
    <button
      key={key}
      id={id}
      type="button"
      className={classButton + " buttonAction"}
      data-toggle={dataToggle}
      title={title}
      data-container={dataContainer}
      onClick={(event) => handleColor(event)}
      value={"red"}
    >
      <span> {icon}</span>
    </button>
  );
};

export default ButtonAction;
