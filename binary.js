class bitTable {
  constructor() {
    this.animationCount = 0;
    this.loadSpeed = 30;
    this.fadeSpeed = 5;
    this.minAlpha = 0.15
    this.intervalFunction = "";
    this.endFunction = "";
    this.font = loadFont('Orbitron-Regular.ttf');

    //Populate Grid with random 0's and 1's according to canvas size caluations
    this.heightCount = windowHeight / 20;
    this.widthCount = windowWidth / 20;
    this.binaryGrid = [];
  }


  randomizeBits() {
    this.binaryGrid = [];
    for (let h = 0; h < this.heightCount; h++) {
      let binaryLine = [];
      for (let w = 0; w < this.widthCount; w++) {
        binaryLine.push({
          bit: this.newBinaryChar(),
          x: 7 + w * 20,
          y: h * 20,
          a: 0,
          txt: "",
        });
      }
      this.binaryGrid.push(binaryLine);
    }
  }

  showYourBits() {
    //If all bits are visible, disable  the interval
    if (this.animationCount >= this.widthCount) {
      clearTimeout(this.intervalFunction);
      this.animationCount = 0;
      setTimeout(() => {
        this.fadingAnimation()
      }, 2000);
      return;
    }

    //Display Binary characters in a random fashion.
    for (let i = 0; i < this.binaryGrid.length; i++) {
      let rnd = this.returnHiddenRandomBit(i);
      let newA = random(this.minAlpha, 1);
      stroke(120, 61, 50, newA);
      rnd.a = newA;
    }
    this.drawBinaryTable();
    this.animationCount++;
  }

  hideYourBits() {
    //If all bits are visible, disable  the interval
    if (this.animationCount >= this.widthCount) {
      clearTimeout(this.intervalFunction);
      this.animationCount = 0;
      console.log('end?');
      this.endFunction();
      return;
    }

    //Display Binary characters in a random fashion.
    for (let i = 0; i < this.binaryGrid.length; i++) {
      let rnd = this.returnVisibleRandomBit(i);
      let newA = 0;
      stroke(120, 61, 50, newA);
      rnd.a = newA;
    }
    this.drawBinaryTable();
    this.animationCount++;
  }

  returnHiddenRandomBit(rowIndex) {
    let myArray = this.binaryGrid[rowIndex].filter((bit) => {
      if (bit.a < this.minAlpha) {
        return bit;
      }
    });
    return myArray[(Math.random() * myArray.length) | 0];
  }

  returnVisibleRandomBit(rowIndex) {
    let myArray = this.binaryGrid[rowIndex].filter((bit) => {
      if (bit.a >= this.minAlpha) {
        return bit;
      }
    });
    return myArray[(Math.random() * myArray.length) | 0];
  }

  newBinaryChar() {
    return Math.random() >= 0.5 ? 1 : 0;
  }

  drawBinaryTable() {
    push();
    background(0);
    fill(120, 61, 50, 0);
    stroke(120, 61, 50, 0);
    textSize(20);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    this.binaryGrid.forEach((bLine) => {
      bLine.forEach((bit) => {
        stroke(120, 61, 50, bit.a);
        if (bit.a > 0) {
          bit.txt = text(bit.bit, bit.x, bit.y);
        }
      });
    });
    pop();
  }

  loadingAnimation() {
    background(0);
    colorMode(HSL);
    this.randomizeBits();
    this.intervalFunction = setInterval(
      () => this.showYourBits(),
      this.loadSpeed
    );
  }

  fadingAnimation() {
    this.intervalFunction = setInterval(
      () => this.hideYourBits(),
      this.fadeSpeed
    );
  }
}