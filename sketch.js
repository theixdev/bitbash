/* 
  SKETCH NAME :  BitBash
  AUTHOR : Dale Chester   Student No: n10581618
  
  HOW TO USE :  Simply pretend your a movie hacker from the 90's,  and start hacking away at your keyboard.
  Important COMPLETE THE FUNCTION to see the whole sketch!!

  BRIEF :  This sketch was to address Brief 3.   Uses 2 fonts and hack.txt as a data input.
  
  ADDITIONAL NOTE:  Utilizies a binary.js created by me to implement the binary transition
    
*/



let pcFont;
//Location of editor cursor
let cursorXY = {
  x: 20,
  y: 30
};



//Important variable determines which stage of the sketch is active. Should increment.
let stage = 1;
let intervalFunction;
let animationText = "";

let lineStart = ">>          ";
let lineCount = 0;
let hack = "";
let textEntry = "";
let cursorPos = 0;

let curDateTime;

function preload() {
  loadStrings("hack.txt", readHack);
  pcFont = loadFont('ChakraPetch-Regular.ttf');
  bitAnimation = new bitTable();
}

function readHack(result) {
  for (let i = 0; i < result.length; i++) {
    hack = hack + result[i];
    if (i < result.length - 1) {
      hack = hack + "\n";
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(24);
  textFont(pcFont);
  fill(`green`);
  lineCount = getNewLineCount(hack);
  updateStage(false);
}


function getNewLineCount(str) {
  let lineCount = str.match(/[\n\r]/g).length + 1;
  return lineCount;
}

function flashingCursor() {

  if (animationText == "_") {
    animationText = "";
  } else {
    animationText = "_";
  }
}

function percAnimation() {
  if (animationText <= 99) {
    animationText++;
  } else {
    animationText = "";
    updateStage();

  }
}

function dotAnimation() {
  if (animationText.length === 5) {
    animationText = ".";
    updateStage();
  } else {
    animationText = animationText + `.`;
  }
}

//Used to set up variables and animations for the next stage.
function updateStage(incrementValue = true) {
  clearInterval(intervalFunction);
  if (incrementValue) {
    animationText = "";
    stage++;
  }
  switch (stage) {
    case 1:
      animationText == "_"
      intervalFunction = setInterval(flashingCursor, 300);
      break;
    case 2:
      animationText == "."
      intervalFunction = setInterval(percAnimation, 35);
      break;
    case 3:
      animationText == "."
      intervalFunction = setInterval(percAnimation, 35);
      break;
    case 4:
      animationText == "."
      intervalFunction = setInterval(percAnimation, 750);
      break;
    case 5:
      clearInterval(intervalFunction)
      bitAnimation.endFunction = () => {
        updateStage();
      }
      break;
    case 6:
      background(0);
      textSize(24);
      textFont(pcFont);
      fill(`green`)
      curDateTime = new Date();
      loop();
  }
}

function draw() {
  switch (stage) {
    case 1:
      background(0);
      text(lineStart, 20, 30);
      text(textEntry + animationText, 90, 30);
      break;
    case 2:
      background(0);
      text(lineStart, 20, 30);
      text(textEntry, 90, 30);
      text(`Compiling code ${animationText}%`, 20, lineCount * 45);
      break;
    case 3:
      background(0);
      text(lineStart, 20, 30);
      text(textEntry, 90, 30);
      text(`Compiling code 100%`, 20, lineCount * 45);
      text(`Publishing tutor's internet search history ${animationText}%`, 20, (lineCount + 1) * 45);
      break;
    case 4:
      background(0);
      text(lineStart, 20, 30);
      text(textEntry, 90, 30);
      text(`Compiling code 100%`, 20, lineCount * 45);
      text(`Accessing Mainframe 100%`, 20, (lineCount + 1) * 45);
      updateStage();
      break;
    case 5:
      background(0)
      bitAnimation.loadingAnimation();
      noLoop();
      break;
    case 6:

      text(`System Accessed at : ${curDateTime}.`, 10, 30)
      text(`Press any key to start all over again....`, 10, 80);
      break;
  }
}

function keyTyped() {

  if (stage == 6) {
    textEntry = ""
    cursorPos = 0;
    lineStart = ">>          "
    stage = 1;
    updateStage(false);
    return;
  }


  if (cursorPos < hack.length) {
    if (hack[cursorPos] === '\n') {
      lineStart = lineStart + "\n" + ">>          ";
    }
    textEntry = textEntry + hack[cursorPos];
    cursorPos++;
  }

  //Update stage if typing prompt has been filled out.
  if ((stage == 1 || stage == 7) && cursorPos == hack.length) {
    updateStage();
  }
}