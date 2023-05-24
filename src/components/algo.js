import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [width, setWidht] = useState(500);
  const [height, setHeight] = useState(500);
  const [draw, setDraw] = useState(false);

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
        ctx.lineTo(evt.clientX, evt.clientY);
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
  const deleteImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o conteúdo anterior do canvas
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

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
    </div>
  );
};

export default CanvasComponent;
