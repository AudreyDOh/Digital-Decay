let srcImg;
let maxBrightness = 0;
let brightestPixels = [];
let processFrames = 5;

function preload() {
  srcImg = loadImage("colorfulImage.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  map (srcImg.width, 0, srcImg.width, 0, windowWidth)
  map (srcImg.height, 0, srcImg.height, 0, windowHeight); 
  colorMode(HSB, 255);
  frameRate(30);
}


function draw() {
  if (frameCount % processFrames === 0) {
    srcImg.loadPixels();
    maxBrightness = 0;
    brightestPixels = [];

    // Find the brightest pixels
    for (let i = 0; i < srcImg.pixels.length; i += 4) {
      let r = srcImg.pixels[i];
      let g = srcImg.pixels[i + 1];
      let b = srcImg.pixels[i + 2];
      
      let brightnessValue = brightness(color(r, g, b));
      
      if (brightnessValue > maxBrightness) {
        maxBrightness = brightnessValue;
        brightestPixels = [i];
      } else if (brightnessValue === maxBrightness) {
        brightestPixels.push(i);
      }
    }

    // Darken the brightest pixels
    for (let i of brightestPixels) {
      let currentColor = color(srcImg.pixels[i], srcImg.pixels[i + 1], srcImg.pixels[i + 2]);
      let newBrightness = max(brightness(currentColor) - 5, 0);
      let newColor = color(hue(currentColor), saturation(currentColor), newBrightness);
      
      srcImg.pixels[i] = red(newColor);
      srcImg.pixels[i + 1] = green(newColor);
      srcImg.pixels[i + 2] = blue(newColor);
    }

    srcImg.updatePixels();
  }

  // Display the modified image
  image(srcImg, 0, 0, windowWidth, windowHeight);
}