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

const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFEA00, 1)
.drawRect(200, 200, 100, 200)
.endFill();



app.stage.addChild(rectangle)

const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: 'deepskyblue',
    stroke: "#ffffff",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowDistance: 10,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000'
});


const myText = new PIXI.Text('hello world!', style);

app.stage.addChild(myText);

myText.text = "text has changed!"

myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = 'center';

app.ticker.add(delta => loop(delta))

function loop(delta) {
    // char1Sprite.rotation += 0.01;
}

// const char1Texture = PIXI.Texture.from('./images/and.png');
// const char1Sprite = new PIXI.Sprite(char1Texture);
///////// render the sprites /////////
// const char1Sprite = PIXI.Sprite.from('./images/and.png')   
// app.stage.addChild(char1Sprite)

const container = new PIXI.Container();

const char2Sprite = PIXI.Sprite.from('./images/or.png')
container.addChild(char2Sprite);

app.stage.addChild(container);



//////// manipulate the sprites /////////
// char1Sprite.width = 500;
// char1Sprite.height = 500;

char2Sprite.width = 500;
char2Sprite.height = 500;

// char1Sprite.x = 200;
// char1Sprite.y = 200;

char2Sprite.x = 200;
char2Sprite.y = 200;


// char1Sprite.position.set(800, 200)
char2Sprite.position.set(800, 200)


// char1Sprite.anchor.x = 0.5;
// char1Sprite.anchor.y = 0.5;

// char1Sprite.anchor.set(0.5, 0.5)

// char1Sprite.interactive = true; 
// char1Sprite.buttonMode = true;

char2Sprite.anchor.set(0.5, 0.5)

char2Sprite.interactive = true; 
char2Sprite.buttonMode = true;


// container.hitArea = new PIXI.Rectangle(200, 200, 0, 0)
// char1Sprite.on('pointerdown', function(){
//     char1Sprite.scale.x += 0.1;
//     char1Sprite.scale.y += 0.1;
// });
const andGate = new PIXI.Graphics();

andGate.beginFill(0xffffff);
andGate.drawRect(0, 0, 100, 100);
andGate.endFill();

andGate.beginFill(0x000000);
andGate.drawCircle(0, 30, 10);
andGate.drawCircle(0, 70, 10);
andGate.drawCircle(100, 50, 10);
andGate.endFill();

andGate.input1 = {x: 0, y: 30};
andGate.input2 = {x: 0, y: 70};
andGate.output = {x: 100, y: 50};

andGate.interactive = true;
andGate.buttonMode = true;

app.stage.addChild(andGate);

andGate.on('mousedown', function (e) {
	console.log('Picked up');
	
	andGate.x = e.data.global.x;
	andGate.y = e.data.global.y;
	andGate.dragging = true;
});

andGate.on('mousemove', function (e) {
	console.log('Dragging');
	
	if (andGate.dragging) {
		andGate.x = e.data.global.x;
		andGate.y = e.data.global.y;
	}
});

andGate.on('mouseup', function (e) {
	console.log('Moving');
	
	andGate.x = e.data.global.x;
	andGate.y = e.data.global.y;
	andGate.dragging = false;
});

// char2Sprite.on('mousedown', function (e) {
// 	console.log('Picked up');
	
// 	char2Sprite.x = e.data.global.x;
// 	char2Sprite.y = e.data.global.y;
// 	char2Sprite.dragging = true;
// });

// char2Sprite.on('mousemove', function (e) {
// 	console.log('Dragging');
	
// 	if (char2Sprite.dragging) {
// 		char2Sprite.x = e.data.global.x;
// 		char2Sprite.y = e.data.global.y;
// 	}
// });

// char2Sprite.on('mouseup', function (e) {
// 	console.log('Moving');
	
// 	char2Sprite.x = e.data.global.x;
// 	char2Sprite.y = e.data.global.y;
// 	char2Sprite.dragging = false;
// });

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight')
        char2Sprite.x += 10;
    if(e.key === 'ArrowLeft')
        char2Sprite.x -=10;
})



// const container = new PIXI.Container();

// const char2Sprite = PIXI.Sprite.from('./images/or.png')
// container.addChild(char2Sprite);

// const char3Sprite = PIXI.Sprite.from('./images/or.png')
// container.addChild(char3Sprite);

// app.stage.addChild(container);

// char2Sprite.position.set( 0, 500)

// const particleContainer = new PIXI.ParticleContainer(1000, {
//     position: true,
//     rotation: true,
//     vertices: true,
//     tint: true,
//     uvs: true
// });

// const loader = PIXI.Loader.shared;

// loader.add('char4Texture', './images/or.png');

// loader.load(setup);


// function setup(loader, resources){
//     const char4Sprite = new PIXI.Sprite(
//         resources.char4Texture.texture
//     );
//     char4Sprite.y = 400;
//     app.stage.appendChild(char4Sprite);
// }

