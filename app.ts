import * as PIXI from 'pixi.js'
import { DisplayObject } from 'pixi.js'


const app = new PIXI.Application({
  width: 500,
  height: 500,
  backgroundColor: 0x2c3e50
})

export default (elementId: string) => {
  // 缩放模式
  // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container

  // The application will create a canvas element for you that you
  // can then insert into the DOM

  document.getElementById(elementId)?.appendChild(app.view)

  // document.body.appendChild(app.view)

  // load the texture we need
  app.loader.add('bunny', logoImage).load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture)

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2
    bunny.y = app.renderer.height / 2

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny)

    bunny.scale.set(1)

    bunny.anchor.x = 0.5
    bunny.anchor.y = 0.5
    setDraggable(bunny)
  })

  let rectangle = drawRectangle(10, 200, 64, 32)
  setDraggable(rectangle)
  app.stage.addChild(rectangle)
  // bindGlobalInput(app.stage)
}

function drawRectangle(x: number, y: number, width: number, height: number) {
  let rectangle = new PIXI.Graphics()
  rectangle.lineStyle(4, 0xff3300, 1)
  rectangle.beginFill(0x66ccff)
  rectangle.drawRect(0, 0, width, height)
  rectangle.endFill()
  rectangle.x = x
  rectangle.y = y
  return rectangle
}

function setDraggable(obj: PIXI.DisplayObject) {
  // Rotate around the center

  obj.interactive = true
  obj.buttonMode = true

  obj
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
}

interface DragObject extends DisplayObject {
  dragData: PIXI.InteractionData
  dragging: number
  dragPointerStart: PIXI.DisplayObject
  dragObjStart: PIXI.Point
  dragGlobalStart: PIXI.Point
}

function onDragStart(event: PIXI.InteractionEvent) {
  const obj = event.currentTarget as DragObject
  obj.dragData = event.data
  obj.dragging = 1
  obj.dragPointerStart = event.data.getLocalPosition(obj.parent)
  obj.dragObjStart = new PIXI.Point()
  obj.dragObjStart.copyFrom(obj.position)
  obj.dragGlobalStart = new PIXI.Point()
  obj.dragGlobalStart.copyFrom(event.data.global)
}

function onDragEnd(event: PIXI.InteractionEvent) {
  const obj = event.currentTarget as DragObject
  if (!obj.dragging) return

  snap(obj)

  obj.dragging = 0
  // set the interaction data to null
  // obj.dragData = null
}

function onDragMove(event: PIXI.InteractionEvent) {
  const obj = event.currentTarget as DragObject
  if (!obj.dragging) return
  const data = obj.dragData // it can be different pointer!
  if (obj.dragging === 1) {
    // click or drag?
    if (
      Math.abs(data.global.x - obj.dragGlobalStart.x) +
        Math.abs(data.global.y - obj.dragGlobalStart.y) >=
      3
    ) {
      // DRAG
      obj.dragging = 2
    }
  }
  if (obj.dragging === 2) {
    const dragPointerEnd = data.getLocalPosition(obj.parent)
    // DRAG
    obj.position.set(
      obj.dragObjStart.x + (dragPointerEnd.x - obj.dragPointerStart.x),
      obj.dragObjStart.y + (dragPointerEnd.y - obj.dragPointerStart.y)
    )
  }
}

// === CLICKS AND SNAP ===

function snap(obj: DragObject) {
  obj.position.x = Math.min(Math.max(obj.position.x, 0), app.screen.width)
  obj.position.y = Math.min(Math.max(obj.position.y, 0), app.screen.height)
}