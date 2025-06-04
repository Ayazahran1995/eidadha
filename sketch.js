let symmetry = 6;
let angle;
let drawMode = 'line';
let stars = [];
let isDrawing = false;

// UI Elements
let saveButton, clearButton, colorPicker, strokeWidthSlider, backgroundColorPicker;

function setup() {
  const canvas = createCanvas(windowWidth - 40, windowHeight - 200);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  angle = 360 / symmetry;
  background(255);
  stroke(50, 115, 220); // Fintech blue
  strokeWeight(4);

  // Welcome screen button
  document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('canvas-container').style.display = 'block';
    isDrawing = true;
  });

  // Modern UI Panel
  const uiPanel = createDiv();
  uiPanel.style('background', 'white');
  uiPanel.style('padding', '15px');
  uiPanel.style('border-radius', '12px');
  uiPanel.style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
  uiPanel.style('margin', '20px auto');
  uiPanel.style('max-width', '800px');

  // Save Button
  saveButton = createButton('💾 Save Art');
  saveButton.parent(uiPanel);
  saveButton.style('background', '#3182ce');
  saveButton.style('color', 'white');
  saveButton.style('border', 'none');
  saveButton.style('padding', '8px 16px');
  saveButton.style('margin-right', '10px');
  saveButton.mousePressed(saveImage);

  // Clear Button
  clearButton = createButton('🧹 Clear');
  clearButton.parent(uiPanel);
  clearButton.style('background', '#e53e3e');
  clearButton.style('color', 'white');
  clearButton.style('border', 'none');
  clearButton.style('padding', '8px 16px');
  clearButton.mousePressed(clearCanvas);

  // Color Picker with Tooltip
  let colorLabel = createSpan('🎨 Brush: ');
  colorLabel.parent(uiPanel);
  colorLabel.class('tooltip');
  colorLabel.attribute('title', 'Change drawing color');
  colorPicker = createColorPicker('#3273dc');
  colorPicker.parent(uiPanel);
  colorPicker.style('margin', '0 15px');

  // Brush Size
  let sizeLabel = createSpan('✒️ Size: ');
  sizeLabel.parent(uiPanel);
  strokeWidthSlider = createSlider(1, 32, 4, 1);
  strokeWidthSlider.parent(uiPanel);
  strokeWidthSlider.style('width', '100px');

  // Mode Toggle
  let modeButton = createButton('🌟 Toggle Stars');
  modeButton.parent(uiPanel);
  modeButton.style('background', '#805ad5');
  modeButton.style('margin-left', '15px');
  modeButton.mousePressed(() => {
    drawMode = drawMode === 'line' ? 'star' : 'line';
    modeButton.html(drawMode === 'line' ? '🌟 Toggle Stars' : '➖ Toggle Lines');
  });
}

function draw() {
  if (!isDrawing) return;

  translate(width / 2, height / 2);
  stroke(colorPicker.color());
  strokeWeight(strokeWidthSlider.value());

  if (mouseIsPressed) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    // Sparkles
    if (random() > 0.7) {
      fill(255, 215, 0);
      noStroke();
      circle(mx, my, random(2, 5));
    }

    // Symmetrical drawing
    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      if (drawMode === 'line') {
        line(mx, my, pmx, pmy);
      } else {
        drawStar(mx, my, strokeWidthSlider.value() * 2);
      }
      push();
      scale(1, -1);
      if (drawMode === 'line') line(mx, my, pmx, pmy);
      else drawStar(mx, my, strokeWidthSlider.value() * 2);
      pop();
    }
  }
}

function drawStar(x, y, size) {
  push();
  translate(x, y);
  fill(colorPicker.color());
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = i * 72 - 90;
    vertex(cos(angle) * size, sin(angle) * size);
    angle += 36;
    vertex(cos(angle) * (size / 2), sin(angle) * (size / 2));
  }
  endShape(CLOSE);
  pop();
}

function saveImage() {
  saveCanvas('eid-art', 'png');
}

function clearCanvas() {
  background(255);
}

function windowResized() {
  resizeCanvas(windowWidth - 40, windowHeight - 200);
}
