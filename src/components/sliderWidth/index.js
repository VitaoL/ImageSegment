import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSize } from "../../redux/sizeSlider";

import "./style.css";

const SliderWidth = () => {
  const size = useSelector((state) => state.size);
  const dispatch = useDispatch();
  const [sliderCircleSizeState, setSliderCircleSizeState] = useState("15px");
  // const [sliderCircleMarginState, setSliderCircleMarginState] = useState("2px");

  const handleSizeValue = (value) => {
    dispatch(changeSize(value));
  };

  function updateSliderValue(value) {
    var sliderCircleSize = value + "px";
    setSliderCircleSizeState(sliderCircleSize);
    //var sliderCircleMargin = (30 - value) / 2 + "px";
    //setSliderCircleMarginState(sliderCircleMargin);
    // var sliderCircleC = 30 - (30 - value) / 2 + "px";
    //$("#sliderAmount").html(v);
    //$("#sliderCircle").    console.log("vvv", vvv);css("width", v).css("height", v).css("margin-top", vv);
    //$("#sliderCircleC").css("height", vvv);
  }
  return (
    <div className="sliderDiv">
      <input
        type="range"
        min={0}
        max={30}
        value={size.value}
        onChange={(event) => {
          updateSliderValue(event.target.valueAsNumber);
          handleSizeValue(event.target.valueAsNumber);
        }}
      />
      <div
        id="sliderCircleC"
        className="circleContainer"
        style={{ width: "20px", height: "20px" }}
      >
        <div
          id="sliderCircle"
          className="circle"
          style={{
            width: sliderCircleSizeState,
            height: sliderCircleSizeState,
          }}
        ></div>
      </div>
    </div>
  );
};
export default SliderWidth;
