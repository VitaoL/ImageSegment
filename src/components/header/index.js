import React, { useState } from "react";
import "./style.css";

const Header = () => {
  const [title, setTitle] = useState("Undefined");

  return (
    <div className="Header">
      <div className="headerContainer">
        <h3>Company Logo</h3>
        <p className="headerText">
          Uso do aprendizado de marcadores para sistemas de anotação inteligente
        </p>
        <button className="headerButton">Read more</button>
      </div>
      <input
        className="title"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{ width: `${title.length + 1}ch` }}
      />
    </div>
  );
};

export default Header;
