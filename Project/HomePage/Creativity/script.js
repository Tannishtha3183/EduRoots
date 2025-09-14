const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let tool = document.getElementById('tool').value;
let color = document.getElementById('color').value;
let size = document.getElementById('size').value;

let undoStack = [];
let redoStack = [];

// Track mouse drawing
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);
canvas.addEventListener('mousemove', draw);

document.getElementById('tool').addEventListener('change', e => tool = e.target.value);
document.getElementById('color').addEventListener('input', e => color = e.target.value);
document.getElementById('size').addEventListener('input', e => size = e.target.value);

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);
document.getElementById('clear').addEventListener('click', clearCanvas);

function saveState() {
  undoStack.push(canvas.toDataURL());
  redoStack = [];
}

function startDraw(e) {
  drawing = true;
  saveState();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDraw() {
  drawing = false;
  ctx.closePath();
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = size;
  ctx.lineCap = 'round';

  if (tool === 'pen' || tool === 'brush') {
    ctx.strokeStyle = color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } 
  else if (tool === 'eraser') {
    ctx.strokeStyle = "#fff";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } 
  else if (tool === 'spray') {
    for (let i = 0; i < 10; i++) {
      const offsetX = e.offsetX + (Math.random() - 0.5) * 20;
      const offsetY = e.offsetY + (Math.random() - 0.5) * 20;
      ctx.fillStyle = color;
      ctx.fillRect(offsetX, offsetY, 1, 1);
    }
  }
}

function undo() {
  if (undoStack.length) {
    redoStack.push(canvas.toDataURL());
    const imgData = undoStack.pop();
    let img = new Image();
    img.src = imgData;
    img.onload = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img,0,0);
    }
  }
}

function redo() {
  if (redoStack.length) {
    undoStack.push(canvas.toDataURL());
    const imgData = redoStack.pop();
    let img = new Image();
    img.src = imgData;
    img.onload = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img,0,0);
    }
  }
}

function clearCanvas() {
  saveState();
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// --- Shapes ---
document.getElementById('add-shape').addEventListener('click', () => {
  const shape = document.getElementById('shape').value;
  if (!shape) return;

  saveState();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;

  const x = 100 + Math.random() * 600;
  const y = 100 + Math.random() * 300;
  const w = 100, h = 100;

  switch(shape){
    case 'line':
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+150, y+50);
      ctx.stroke();
      break;
    case 'rectangle':
      ctx.strokeRect(x, y, 150, 100);
      break;
    case 'square':
      ctx.strokeRect(x, y, 100, 100);
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI*2);
      ctx.stroke();
      break;
    case 'oval':
      ctx.beginPath();
      ctx.ellipse(x, y, 60, 40, 0, 0, Math.PI*2);
      ctx.stroke();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+100, y+100);
      ctx.lineTo(x-100, y+100);
      ctx.closePath();
      ctx.stroke();
      break;
    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(x, y-60);
      ctx.lineTo(x+60, y);
      ctx.lineTo(x, y+60);
      ctx.lineTo(x-60, y);
      ctx.closePath();
      ctx.stroke();
      break;
    case 'arrow':
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+100, y);
      ctx.lineTo(x+80, y-20);
      ctx.moveTo(x+100, y);
      ctx.lineTo(x+80, y+20);
      ctx.stroke();
      break;
  }
});
