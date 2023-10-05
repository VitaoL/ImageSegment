import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeImgContext } from "../../redux/imgContextSlice";
import { useSelector } from "react-redux";
import { drawLine, getMousePos, mouseAction } from "../../functions/draw";
import "./style.css";

const CanvasComponent = () => {
  const [width, setWidht] = useState(600);
  const [height, setHeight] = useState(600);

  const [mousePressed, setMousePressed] = useState(null);

  const size = useSelector((state) => state.size);

  const [draw, setDraw] = useState(false);
  const canvasImRef = useRef(null);
  const canvasMRef = useRef(null);
  const canvasMouse1Ref = useRef(null);
  const canvasMouse2Ref = useRef(null);
  const test = useSelector((state) => state.imgContext);
  const color = useSelector((state) => state.color);

  const dispatch = useDispatch();

  const dispCanvasImgRef = (ref) => {
    if (test.contextImg === null) {
      dispatch(changeImgContext(ref));
    }
  };

  useEffect(() => {
    const canvas = canvasImRef.current;
    const contextIm = canvasImRef.current.getContext("2d");
    const contextM = canvasMRef.current.getContext("2d");
    if (test.contextImg === null) {
      if (contextIm) {
        dispCanvasImgRef(canvas);
      }
    }

    const contextMouse1 = canvasMouse1Ref.current.getContext("2d");
    const contextMouse2 = canvasMouse2Ref.current.getContext("2d");

    const handleMouseDown = (evt) => {
      //Mudar aqui quando validar sim ou não
      if (true) {
        setMousePressed(evt.which);
        const mousePos = getMousePos(canvas, evt);
        setDraw(true);
        mouseAction(
          mousePos,
          color,
          [contextMouse1, contextMouse2],
          contextM,
          size.value,
          width,
          height,
          mousePressed
        );
      }
    };
    const handleMouseUp = (evt) => {
      setMousePressed(null);
      setDraw(false);
    };
    const handleMouseMove = (evt) => {
      if (true) {
        const mousePos = getMousePos(canvas, evt);
        setMousePressed(evt.which);
        mouseAction(
          mousePos,
          color,
          [contextMouse1, contextMouse2],
          contextM,
          size.value,
          width,
          height,
          mousePressed
        );
      }
    };
    canvasMouse1Ref.current.addEventListener("mousedown", handleMouseDown);
    canvasMouse1Ref.current.addEventListener("mouseup", handleMouseUp);
    canvasMouse1Ref.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvasMouse1Ref.current.removeEventListener("mouseup", handleMouseUp);
      canvasMouse1Ref.current.removeEventListener("mousedown", handleMouseDown);
      canvasMouse1Ref.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draw, color, mousePressed, size]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ctx = test.contextImg.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, test.contextImg.width, test.contextImg.height); // Limpa o conteúdo anterior do canvas
          ctx.drawImage(
            img,
            0,
            0,
            test.contextImg.width,
            test.contextImg.height
          ); // Desenha a imagem no canvas
        }
      };
      img.src = e.target?.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="chooseFileLabel">
        <input
          type="file"
          accept="image/*"
          className="chooseFileInput"
          onChange={(event) => handleImageUpload(event)}
        />
        choose a photo
      </label>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasImRef}
          width={width}
          height={height}
          style={{ position: "absolute", zIndex: 1 }}
        />
        <canvas
          ref={canvasMRef}
          width={width}
          height={height}
          style={{ position: "absolute", zIndex: 2 }}
        />
        <canvas
          ref={canvasMouse1Ref}
          width={width}
          height={height}
          style={{ position: "absolute", zIndex: 7 }}
        />
      </div>
      <canvas
        ref={canvasMouse2Ref}
        width={width}
        height={height}
        style={{ marginLeft: width, zIndex: 5 }}
      />
    </div>
  );
};

export default CanvasComponent;
