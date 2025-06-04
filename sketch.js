// Fintech Eid Kaleidoscope - Full Code
let symmetry = 6;
let angle;
let strokeColor = '#2563eb'; // Fintech blue
let strokeWeight = 8;
let backgroundColor = '#ffffff';
let isDrawing = false;

function setup() {
  const canvas = createCanvas(windowWidth - 40, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  angle = 360 / symmetry;
  background(backgroundColor);
  
  createFintechUI();
  setupEventListeners();
}

function draw() {
  translate(width / 2, height / 2);
  
  if (isDrawing && mouseIsPressed) {
    stroke(strokeColor);
    strokeWeight(strokeWeight);
    
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    // Fintech-style symmetrical patterns
    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      line(mx, my, pmx, pmy);
      
      // Modern mirrored effect
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }

    // Add data-point dots (fintech aesthetic)
    if (frameCount % 5 === 0) {
      noStroke();
      fill(strokeColor);
      circle(mx, my, strokeWeight/2);
    }
  }
}

function createFintechUI() {
  // Main control panel
  const controls = createDiv();
  controls.id('controls');
  controls.style('background', 'white');
  controls.style('border-radius', '12px');
  controls.style('box-shadow', '0 4px 20px rgba(0,0,0,0.05)');
  controls.style('max-width', '900px');
  controls.style('margin', '20px auto');
  controls.style('padding', '20px');
  controls.style('display', 'flex');
  controls.style('flex-wrap', 'wrap');
  controls.style('gap', '15px');
  controls.style('align-items', 'center');

  // Save button
  const saveBtn = createButton('💾 Save');
  saveBtn.parent(controls);
  saveBtn.class('btn');
  saveBtn.mousePressed(() => saveCanvas('fintech-eid-art', 'png'));

  // Clear button
  const clearBtn = createButton('🧹 Clear');
  clearBtn.parent(controls);
  clearBtn.class('btn btn-outline');
  clearBtn.mousePressed(() => {
    clear();
    background(backgroundColor);
  });

  // Color picker
  const colorLabel = createSpan('🎨');
  colorLabel.parent(controls);
  colorLabel.attribute('data-tooltip', 'Brush Color');
  colorLabel.class('tooltip');
  
  const colorPicker = createColorPicker('#2563eb');
  colorPicker.parent(controls);
  colorPicker.input(() => {
    strokeColor = colorPicker.value();
    select('#brush-preview').style('background', strokeColor);
  });

  // Brush size slider
  const sizeLabel = createSpan('✒️');
  sizeLabel.parent(controls);
  sizeLabel.attribute('data-tooltip', 'Brush Size (1-32px)');
  sizeLabel.class('tooltip');
  
  const sizeSlider = createSlider(1, 32, 8, 1);
  sizeSlider.parent(controls);
  sizeSlider.input(() => {
    strokeWeight = sizeSlider.value();
    select('#brush-size-value').html(strokeWeight);
    select('#brush-preview').style('width', `${strokeWeight}px`);
    select('#brush-preview').style('height', `${strokeWeight}px`);
  });

  // Size value display
  const sizeValue = createSpan('8px');
  sizeValue.parent(controls);
  sizeValue.id('brush-size-value');

  // Brush preview
  const brushPreview = createDiv();
  brushPreview.parent(controls);
  brushPreview.id('brush-preview');
  brushPreview.style('width', '24px');
  brushPreview.style('height', '24px');
  brushPreview.style('border-radius', '50%');
  brushPreview.style('background', strokeColor);
  brushPreview.style('display', 'inline-block');
}

function setupEventListeners() {
  // Start drawing when canvas is clicked
  const canvas = select('#canvas-container').elt;
  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);
}

function windowResized() {
  resizeCanvas(windowWidth - 40, 600);
}
