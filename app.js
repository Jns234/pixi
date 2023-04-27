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


// andGate.on('mousedown', function (e) {
// 	console.log('Picked up');
	
// 	andGate.x = e.data.global.x;
// 	andGate.y = e.data.global.y;
// 	andGate.dragging = true;
// });

// andGate.on('mousemove', function (e) {
// 	console.log('Dragging');
	
// 	if (andGate.dragging) {
// 		andGate.x = e.data.global.x;
// 		andGate.y = e.data.global.y;
// 	}
// });

// andGate.on('mouseup', function (e) {
// 	console.log('Moving');
	
// 	andGate.x = e.data.global.x;
// 	andGate.y = e.data.global.y;
// 	andGate.dragging = false;
// });




function onDragStart(event) {
  
    if (this.tween) {
      this.tween.kill();
    }
    
    this.data = event.data;  
    this.lastPosition = this.data.getLocalPosition(this.parent); 
  }
  
  function onDragMove() {
    
    if (this.lastPosition) {
      
      var newPosition = this.data.getLocalPosition(this.parent);    
      this.position.x += (newPosition.x - this.lastPosition.x);
      this.position.y += (newPosition.y - this.lastPosition.y);
      this.lastPosition = newPosition;
    }
  }
  
  function onDragEnd() {
    
    this.data = null;
    this.lastPosition = null;
  }

function createAND() {
    const andGate = new PIXI.Graphics();

    andGate.beginFill(0xffffff)
        .drawRect(0, 0, 100, 100)
        .endFill();

    andGate.beginFill(0x000000)
        .drawCircle(0, 30, 10)
        .drawCircle(0, 70, 10)
        .drawCircle(100, 50, 10)
        .endFill();

    andGate.width = 100;
    andGate.height = 100;

    andGate.x = 200;
    andGate.y = 200;

    andGate.position.set(800, 200)

    andGate.input1 = { x: 0, y: 30 }
        .input2 = { x: 0, y: 70 }
        .output = { x: 100, y: 50 };


    andGate.pivot.set(0, 0)

    andGate.interactive = true;
    andGate.buttonMode = true;

    app.stage.addChild(andGate);

    
    andGate
        .on("pointerdown", onDragStart)
        .on("pointerup", onLineDragEnd)
        .on("pointerup", onDragEnd)
        .on("pointermove", onDragMove)
}



function drawLine(x1, y1, x2, y2, color, thickness) {
  const line = new PIXI.Graphics();
  line.lineStyle(thickness, color);
  line.moveTo(x1, y1);
  line.lineTo(x2, y2);
  return line;ˇ
  
}

function onLineDragEnd(callback) {
  let isDragging = false;
  let startPosition = null;

  function handleMouseDown(event) {
    isDragging = true;
    startPosition = [event.clientX, event.clientY];
  }

  function handleMouseUp(event) {
    if (isDragging && startPosition) {
      const endPosition = [event.clientX, event.clientY];
      callback(startPosition, endPosition);
      drawLine(startPosition[0], startPosition[1], endPosition[0], endPosition[1], 0xFF0000, 2);
    }
    isDragging = false;
    startPosition = null;
  }
  function callback(startPosition, endPosition) {
    console.log(`Dragged from (${startPosition[0]}, ${startPosition[1]}) to (${endPosition[0]}, ${endPosition[1]})`);
    const line = drawLine(startPosition[0], startPosition[1],endPosition[0],endPosition[1], 0xFF0000, 2);
    app.stage.addChild(line);
  }
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);

  // return a cleanup function that removes the event listeners
  return function cleanup() {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mouseup", handleMouseUp);
  };
}

createAND()
createAND()

let connection = new PIXI.Graphics();
connection.lineStyle(2, 0xffffff);
connection.moveTo(gate1.outputX, gate1.outputY);
connection.lineTo(gate2.inputX, gate2.inputY);

// Adding the graphics to the stage
app.stage.addChild(connection);

// Updating the connection on every frame
app.ticker.add(() => {
  connection.clear();
  connection.lineStyle(2, 0xffffff);
  connection.moveTo(gate1.outputX, gate1.outputY);
  connection.lineTo(gate2.inputX, gate2.inputY);
});

