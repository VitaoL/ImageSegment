import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [width, setWidht] = useState(500);
  const [height, setHeight] = useState(500);
  const [draw, setDraw] = useState(false);

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  function drawLine(context, p1, p2, width, color) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.lineCap = "round";
    context.stroke();
  }

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
        drawLine(ctx, pos, pos, "4", "#ff0000");
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
        console.log(canvas)
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
