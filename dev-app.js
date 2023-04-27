const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);




//////// Create And gate ///////////
const andGate = new PIXI.Container();

const gateName = new PIXI.Graphics();

gateName.beginFill(0xffffff);
gateName.drawRect(0, 0, 200, 200);
gateName.endFill();

gateName.interactive = true;
gateName.buttonMode = true;

const input1 = new PIXI.Graphics();
input1.beginFill(0xff0000);
input1.active = false;
input1.selected = false;
input1.name = "input1"
input1.drawRect(0, 0, 50, 50);
input1.position.set(0, 20);

const input2 = new PIXI.Graphics();
input2.beginFill(0xff0000);
input2.active = false;
input2.selected = false;
input2.name = "input2";
input2.drawRect(0, 0, 50, 50);
input2.position.set(0, 100)

const output = new PIXI.Graphics();
output.beginFill(0xff0000);
output.drawRect(0, 0, 50, 50);
output.position.set(150, 70)

app.stage.addChild(gateName);
andGate.addChild(gateName);
andGate.addChild(input1)
andGate.addChild(input2)
andGate.addChild(output)
app.stage.addChild(andGate);

andGate.interactive = true;
andGate.buttonMode = true;

input1.interactive = true;
input1.buttonMode = true;
input1.on('pointerdown', () => {
    // input1.clear();
    // input1.beginFill(0x00FF00);
    // input1.drawRect(0, 0, 50, 50);
    // input1.active = true;
    // input1.endFill();
    checkInputStates();
});

input2.interactive = true;
input2.buttonMode = true;
// input2.on('pointerdown', () => {
//     input2.clear();
//     input2.beginFill(0x00FF00);
//     input2.drawRect(0, 0, 50, 50);
//     input2.active = true
//     input2.endFill();
//     checkInputStates();
// });

///////// Create postive charges ////////

const pos1 = new PIXI.Graphics();
pos1.beginFill(0x00FF00);
pos1.drawRect(0, 0, 50, 50);
pos1.position.set(100, 200);
pos1.active = true
pos1.interactive = true;
pos1.selected = false;
pos1.buttonMode = true;
pos1.name = "pos1"

app.stage.addChild(pos1)

const pos2 = new PIXI.Graphics();
pos2.beginFill(0x00FF00);
pos2.drawRect(0, 0, 50, 50);
pos2.position.set(100, 400);
pos2.active = true
pos2.interactive = true;
pos2.selected = false;
pos2.buttonMode = true;
pos2.name = "pos2"

app.stage.addChild(pos1)


const pos3 = new PIXI.Graphics();
pos3.beginFill(0x00FF00);
pos3.drawRect(0, 0, 50, 50);
pos3.position.set(100, 600);
pos3.active = true
pos3.interactive = true;
pos3.selected = false;
pos3.buttonMode = true;
pos3.name = "pos3"

app.stage.addChild(pos1)



const pos4 = new PIXI.Graphics();
pos4.beginFill(0x00FF00);
pos4.drawRect(0, 0, 50, 50);
pos4.position.set(100, 800);
pos4.active = true
pos4.interactive = true;
pos4.selected = false;
pos4.buttonMode = true;
pos4.name = "pos4"

app.stage.addChild(pos1, pos2, pos3, pos4)


////// Mouse activity ////////
andGate.on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointermove', onDragMove);

input1.on('pointerdown', deactivateParent)
    .on('pointerup', activateParent)

input2.on('pointerdown', deactivateParent)
    .on('pointerup', activateParent)




////// activate and deactivate parent /////
function deactivateParent() {
    this.parent.interactive = false;
}

function activateParent() {
    this.parent.interactive = true;

}


///// Movement ///////

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - this.width / 2;
        this.position.y = newPosition.y - this.height / 2;
    }
}


function checkInputStates() {
    if (input1.active == true && input2.active == true) {
        output.clear();
        output.beginFill(0x00FF00);
        output.drawRect(0, 0, 50, 50);
        output.endFill();
    } else if (this.active == true) {
        this.clear();
        this.beginFill(0x00FF00);
        this.drawRect(0, 0, 50, 50);
        this.endFill();
    } else {
        output.clear();
        output.beginFill(0xFF0000);
        output.drawRect(0, 0, 50, 50);
        output.endFill();
    }
}

// function onPos1Click() {
//     console.log("click")
//     pos1.clear();
//     pos1.beginFill(0x00FF00);
//     pos1.drawRect(0, 0, 50, 50);
//     pos1.active = true;
//     pos1.endFill();
//     input1.active = true;
//     checkInputStates();
// }

function drawLine(x1, y1, x2, y2, color, thickness) {
    console.log("Drawing!")
    const line = new PIXI.Graphics();
    line.lineStyle(thickness, color);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
    return line;ˇ
  }

// let firstMouseDown = true;
let firstX, firstY, secondX, secondY;
const posList = [pos1, pos2, pos3, pos4];
const inputList = [input1, input2]

const allObj = [...posList, ...inputList]

function colorSelected(obj) {
    console.log(obj.name)
    obj.clear();
    obj.beginFill(0x0000FF);
    obj.selected = true
    obj.drawRect(0, 0, 50, 50);
    obj.endFill();
}

document.addEventListener("mousedown", (event) => {
    
    allObj.forEach(obj => {
        obj.interactive = true;
        obj.on('click', () => {
            colorSelected(obj)
        })
    }

    )
    // posList.forEach(pos => {
    //     pos.interactive = true;
    //     pos.on('click', () => {
    //     //   console.log(`PIXI Graphics object clicked: ${pos.name}, ${pos.y}`);
    //       firstClick()
    //     });
    // });
    // inputList.forEach(input => {
    //     input.interactive = true;
    //     input.on('click', () => {
    //         // console.log(`PIXI Graphics object clicked: ${input.name}, ${input.y}`);
    //         input.active = true;
    //         // logTwoMouseClickPositions('1')
    //         secondClick()
    //         checkInputStates()
    //         logBothClicks()
    //     });
    //   });
}
);

// create a list of PIXI Graphics objects

async function firstClick() {
    return new Promise((resolve) => {
      const handleClick = function(event) {
        const clickPosition = { x: event.clientX, y: event.clientY };
        console.log('First click position:', clickPosition.x, clickPosition.y);
        document.removeEventListener('click', handleClick);
        resolve(clickPosition);
      };
  
      document.addEventListener('click', handleClick);
    });
  }
  
  async function secondClick() {
    return new Promise((resolve) => {
      const handleClick = function(event) {
        const clickPosition = { x: event.clientX, y: event.clientY };
        console.log('Second click position:', clickPosition.x, clickPosition.y);
        document.removeEventListener('click', handleClick);
        resolve(clickPosition);
      };
  
      document.addEventListener('click', handleClick);
      
    });
  }
  
  async function logBothClicks() {
    const firstClickPosition = await firstClick();
    const secondClickPosition = await secondClick();
    console.log('Both click positions:', firstClickPosition.x, firstClickPosition.y, secondClickPosition.x, secondClickPosition.y);
    const line = drawLine(firstClickPosition.x, firstClickPosition.y, secondClickPosition.x, secondClickPosition.y, 0xFF0000, 10)
    app.stage.addChild(line);

}
  

function selected() {

}