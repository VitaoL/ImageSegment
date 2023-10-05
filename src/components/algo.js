import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { drawLine, getMousePos } from "../functions/draw.js";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [width, setWidht] = useState(500);
  const [height, setHeight] = useState(500);
  const [draw, setDraw] = useState(false);
  const color = useSelector((state) => state.color);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // Aqui você pode adicionar qualquer configuração ou desenho inicial no canvas
    const handleMouseDown = (evt) => {
      ctx.moveTo(evt.clientX, evt.clientY);
      setDraw(true);
    };
    const handleMouseUp = (evt) => {
      setDraw(false);
    };
    const handleMouseMove = (evt) => {
      if (draw) {
        const pos = getMousePos(canvas, evt);
        drawLine(ctx, pos, pos, "4", color.name);
        ctx.stroke();
      }
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draw]);

  const saveBtn = () => {
    const canvas = canvasRef.current;
    const data = canvas.toDataURL("imag/png");
    const a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
  };

  const deleteImage = () => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o conteúdo anterior do canvas
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file, file.name);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    console.log("oi")
    fetch("/http://127.0.0.1:5000/api", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do servidor:", data);
        // Faça algo com a resposta do servidor, se necessário
      })
      .catch((error) => {
        console.error("Erro:", error);
      });

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o conteúdo anterior do canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Desenha a imagem no canvas
        }
      };
      img.src = e.target?.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginTop: "5px" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      />
      <button type="button" onClick={() => saveBtn()}>
        Salvar
      </button>
    </div>
  );
};

export default CanvasComponent;
