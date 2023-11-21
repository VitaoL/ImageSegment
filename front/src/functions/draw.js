// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top,
//   };
// }

var htmlColorNo = "#000000";

function drawCircle(context, position, radius, color) {
  context.beginPath();
  if (color === htmlColorNo) {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
  }
  context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 1;
  context.lineCap = "butt";
  context.strokeStyle = color;
  context.stroke();
}

function drawSquare(context, position, width, color) {
  context.beginPath();
  if (color === htmlColorNo) {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
  }

  context.rect(position.x - width / 2, position.y - width / 2, width, width);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 1;
  context.lineCap = "butt";
  context.strokeStyle = color;
  context.stroke();
}

function drawLine(context, p1, p2, width, color) {
  context.beginPath();
  if (color === htmlColorNo) {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
  }

  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p1.y);
  context.lineWidth = width;
  context.strokeStyle = color;
  context.lineCap = "round";
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(
      ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
    ),
    y: Math.round(
      ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
    ),
  };
}

function clearAll(context) {
  context.clearRect(0, 0, 600, 600);
  //contextSeg.clearRect(0, 0, imWidth, imHeight);
  // imM = contextM.createImageData(imWidth, imHeight);
  // imSeg = contextSeg.createImageData(imWidth, imHeight);
  // historyUndo = [];
}

function mouseAction(
  mousePos,
  color,
  contextMouses,
  contextM,
  penSize,
  imWidth,
  imHeight,
  mousePressed
) {
  var contexts;
  var flag = false;
  var size = penSize;
  var newColor;
  for (var i = 0; i < contextMouses.length; i++) {
    contextMouses[i].clearRect(0, 0, imWidth, imHeight);
    if (color.name === htmlColorNo) {
      //drawSquare(contextMouses[i], mousePos, penSize * 1.5, "rgba(0, 0, 0, 0.5)")
      drawCircle(contextMouses[i], mousePos, penSize, "rgba(0, 0, 0, 0.5)");
    } else {
      drawCircle(contextMouses[i], mousePos, penSize / 2, "rgba(0, 0, 0, 0.5)");
    }
  }
  if (
    color.name === htmlColorNo &&
    (mousePressed === 1 || mousePressed === 3)
  ) {
    contexts = [contextM];
    newColor = "#000000";
    flag = true;
    size *= 2;
    
  } else if (color.name !== htmlColorNo) {
    if (mousePressed === 1) {
      contexts = [contextM];
      newColor = color.name;
      flag = true;
      
    } else if (mousePressed === 3) {
      contexts = [contextM];
      newColor = color.name;
      flag = true;
    }
  }

  if (flag) {
    var mousePO = null;
    apply(contexts, newColor, mousePos, size, mousePO);
    // imM = contextM.getImageData(0, 0, imWidth, imHeight);
    mousePO = mousePos;
  } else {
  }
}

function apply(contexts, color, mousePos, size, mousePO) {
  if (mousePO !== null) {
    for (var i = 0; i < contexts.length; i++) {
      drawLine(contexts[i], mousePO, mousePos, size, color);
    }
  } else {
    for (var i = 0; i < contexts.length; i++) {
      drawCircle(contexts[i], mousePos, size / 2, color);
    }
  }
}

export { drawLine, getMousePos, clearAll, mouseAction };
