let symmetry = 6;
let angle;
let drawMode = 'line'; // Can be 'line' or 'lamb'
let isDrawing = false;
let showEidMubarak = true; // New variable to control text visibility

// UI Elements
let saveButton, clearButton, colorPicker, strokeWidthSlider, toggleTextButton;

function setup() {
    // Create the canvas and attach it to the 'canvas-container' div
    // Ensure you have a <div id="canvas-container"> in your HTML
    const canvas = createCanvas(windowWidth - 40, windowHeight - 200);
    canvas.parent('canvas-container');
    angleMode(DEGREES); // Set angle mode to degrees for easier rotation calculations
    angle = 360 / symmetry; // Calculate the angle for symmetrical rotation
    background(255); // Set initial canvas background to white
    stroke(50, 115, 220); // Set initial stroke color (Fintech blue from original)
    strokeWeight(4); // Set initial stroke weight

    // Event listener for the welcome screen button
    // Ensure you have a <div id="welcome-screen"> and <button id="start-btn"> in your HTML
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('welcome-screen').style.display = 'none'; // Hide welcome screen
        document.getElementById('canvas-container').style.display = 'flex'; // Show canvas container
        isDrawing = true; // Enable drawing
        clearCanvas(); // Clear canvas and draw initial text
    });

    // Create a modern UI Panel using p5.js createDiv and apply Tailwind-like styles
    const uiPanel = createDiv();
    uiPanel.style('background', 'white');
    uiPanel.style('padding', '15px');
    uiPanel.style('border-radius', '12px');
    uiPanel.style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
    uiPanel.style('margin', '20px auto');
    uiPanel.style('max-width', '800px');
    uiPanel.style('display', 'flex');
    uiPanel.style('flex-wrap', 'wrap');
    uiPanel.style('justify-content', 'center');
    uiPanel.style('align-items', 'center');
    uiPanel.parent('canvas-container'); // Attach UI panel to canvas container

    // Save Button
    saveButton = createButton('💾 Save Art');
    saveButton.parent(uiPanel);
    saveButton.class('p5-button'); // Apply custom class for styling
    saveButton.style('background', '#3182ce'); // Blue
    saveButton.style('color', 'white');
    saveButton.style('border', 'none');
    saveButton.style('padding', '8px 16px');
    saveButton.style('margin', '5px'); // Add margin for spacing
    saveButton.mousePressed(saveImage); // Attach save function

    // Clear Button
    clearButton = createButton('🧹 Clear');
    clearButton.parent(uiPanel);
    clearButton.class('p5-button'); // Apply custom class for styling
    clearButton.style('background', '#e53e3e'); // Red
    clearButton.style('color', 'white');
    clearButton.style('border', 'none');
    clearButton.style('padding', '8px 16px');
    clearButton.style('margin', '5px');
    clearButton.mousePressed(clearCanvas); // Attach clear function

    // Color Picker with Tooltip
    let colorGroup = createDiv();
    colorGroup.parent(uiPanel);
    colorGroup.style('display', 'flex');
    colorGroup.style('align-items', 'center');
    colorGroup.style('margin', '5px');

    let colorLabel = createSpan('🎨 Brush: ');
    colorLabel.parent(colorGroup);
    colorLabel.class('tooltip'); // Apply tooltip class
    colorLabel.attribute('title', 'Change drawing color'); // Tooltip text
    colorPicker = createColorPicker('#3273dc'); // Default color
    colorPicker.parent(colorGroup);
    colorPicker.class('p5-color-picker'); // Apply custom class for styling

    // Brush Size Slider
    let sizeGroup = createDiv();
    sizeGroup.parent(uiPanel);
    sizeGroup.style('display', 'flex');
    sizeGroup.style('align-items', 'center');
    sizeGroup.style('margin', '5px');

    let sizeLabel = createSpan('✒️ Size: ');
    sizeLabel.parent(sizeGroup);
    strokeWidthSlider = createSlider(1, 32, 4, 1); // Min, Max, Default, Step
    strokeWidthSlider.parent(sizeGroup);
    strokeWidthSlider.class('p5-slider'); // Apply custom class for styling

    // Mode Toggle Button (Line/Lamb)
    let modeButton = createButton('🐑 Toggle Lamb');
    modeButton.parent(uiPanel);
    modeButton.class('p5-button'); // Apply custom class for styling
    modeButton.style('background', '#805ad5'); // Purple
    modeButton.style('margin', '5px');
    modeButton.mousePressed(() => {
        drawMode = drawMode === 'line' ? 'lamb' : 'line'; // Toggle between line and lamb
        modeButton.html(drawMode === 'line' ? '🐑 Toggle Lamb' : '➖ Toggle Lines'); // Update button text
    });

    // Toggle Eid Mubarak Text Button
    toggleTextButton = createButton('Toggle Eid Text');
    toggleTextButton.parent(uiPanel);
    toggleTextButton.class('p5-button');
    toggleTextButton.style('background', '#2f855a'); // Greenish color
    toggleTextButton.style('color', 'white');
    toggleTextButton.style('border', 'none');
    toggleTextButton.style('padding', '8px 16px');
    toggleTextButton.style('margin', '5px');
    toggleTextButton.mousePressed(() => {
        showEidMubarak = !showEidMubarak; // Toggle the boolean
        clearCanvas(); // Redraw canvas to reflect text visibility change
    });
}

function draw() {
    if (!isDrawing) return; // Only draw if drawing is enabled

    // Save the current transformation state
    push();
    // Translate origin to the center of the canvas for symmetrical drawing
    translate(width / 2, height / 2);
    stroke(colorPicker.color()); // Set stroke color from the color picker
    strokeWeight(strokeWidthSlider.value()); // Set stroke weight from the slider

    if (mouseIsPressed) {
        // Get mouse coordinates relative to the center of the canvas
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;

        // Simple sparkles (optional, can be removed if not desired)
        if (random() > 0.7) {
            fill(255, 215, 0, 150); // Gold color with transparency
            noStroke();
            circle(mx, my, random(2, 5)); // Draw small circles
        }

        // Apply symmetrical drawing
        for (let i = 0; i < symmetry; i++) {
            rotate(angle); // Rotate the canvas for symmetry
            if (drawMode === 'line') {
                line(mx, my, pmx, pmy); // Draw a line
            } else {
                // Draw a lamb silhouette at the current mouse position
                // The size of the lamb is scaled by the stroke width for consistency
                drawLamb(mx, my, strokeWidthSlider.value() * 3);
            }
            push(); // Save the current drawing state
            scale(1, -1); // Flip vertically for additional symmetry
            if (drawMode === 'line') line(mx, my, pmx, pmy);
            else drawLamb(mx, my, strokeWidthSlider.value() * 3);
            pop(); // Restore the drawing state
        }
    }
    // Restore the transformation state before drawing text
    pop();

    // Draw Eid Mubarak text as an overlay if enabled
    if (showEidMubarak) {
        drawEidMubarakText();
    }
}

// Function to draw a simple lamb silhouette
function drawLamb(x, y, size) {
    push(); // Save the current drawing state
    translate(x, y); // Move to the specified coordinates
    fill(colorPicker.color()); // Use the selected brush color for the lamb
    noStroke(); // No stroke for the lamb's body

    // Body (main ellipse)
    ellipse(0, 0, size * 1.5, size);

    // Head (smaller ellipse)
    ellipse(size * 0.8, -size * 0.3, size * 0.6, size * 0.5);

    // Ears (small triangles)
    triangle(size * 0.9, -size * 0.5, size * 1.1, -size * 0.4, size * 0.9, -size * 0.3);
    triangle(size * 0.6, -size * 0.5, size * 0.8, -size * 0.4, size * 0.6, -size * 0.3);

    // Legs (rectangles)
    rect(-size * 0.6, size * 0.3, size * 0.2, size * 0.7);
    rect(-size * 0.2, size * 0.3, size * 0.2, size * 0.7);
    rect(size * 0.2, size * 0.3, size * 0.2, size * 0.7);
    rect(size * 0.6, size * 0.3, size * 0.2, size * 0.7);

    // Tail (small arc or triangle)
    arc(-size * 0.7, -size * 0.1, size * 0.4, size * 0.4, 0, 180);

    // Wool texture (small circles around the body)
    fill(255, 255, 255, 180); // White with transparency for wool
    circle(-size * 0.6, -size * 0.3, size * 0.3);
    circle(-size * 0.3, -size * 0.5, size * 0.3);
    circle(0, -size * 0.5, size * 0.3);
    circle(size * 0.3, -size * 0.4, size * 0.3);
    circle(size * 0.6, -size * 0.2, size * 0.3);
    circle(-size * 0.4, size * 0.2, size * 0.3);
    circle(size * 0.4, size * 0.2, size * 0.3);

    pop(); // Restore the previous drawing state
}

// Function to draw "Eid Adha Mubarak" text
function drawEidMubarakText() {
    push(); // Save current drawing style
    textAlign(CENTER, CENTER); // Center the text
    textSize(min(width, height) * 0.08); // Responsive text size
    fill(50, 115, 220, 150); // Fintech blue with transparency
    noStroke(); // No stroke for the text
    text("Eid Adha Mubarak", width / 2, height / 2); // Draw text in the center of the canvas
    pop(); // Restore previous drawing style
}

// Function to save the canvas as an image
function saveImage() {
    saveCanvas('eid-art', 'png');
}

// Function to clear the canvas
function clearCanvas() {
    background(255); // Set background back to white
    if (showEidMubarak) {
        drawEidMubarakText(); // Redraw text if enabled
    }
}

// Function to resize the canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth - 40, windowHeight - 200);
    clearCanvas(); // Clear and redraw background and text on resize
}
