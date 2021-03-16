import p5Types from "p5";
import Sketch from "react-p5";
import React from "react";
import {HotNode, Point} from "../App";
import Qty from 'js-quantities';

type CanvasProps = {
  nodes: HotNode[]
  addNode: (node: HotNode) => void
  canvas: p5Types.Renderer | undefined
  updateCanvas: (c: p5Types.Renderer) => void
  scaleFactor: number
  updateScaleFactor: (s: number) => void
  translateX: number
  updateTranslateX: (x: number) => void
  translateY: number
  updateTranslateY: (y: number) => void
}

export default function Canvas(props: CanvasProps) {
  console.log("RERENDERED");
  const SCALE_INCREMENT = 0.03;
  const SCROLL_SPEED_SCALE_EFFECT = 0.005;
  const RESET_VIEW_KEY = 32; // 32 is space
  const DEFAULT_NODE_WIDTH = 50; // pixels
  const DEFAULT_NODE_HEIGHT = DEFAULT_NODE_WIDTH; // pixels
  // const theseNodes: HotNode[] = [];

  let canResetView = false;
  // let translateX = 0;
  // let translateY = 0;
  // let scaleFactor = 1;

  function getScaleAdjustment(requestedScroll: number): number {
    if (requestedScroll < 0) {
      return (1 + SCALE_INCREMENT) + (-requestedScroll * SCROLL_SPEED_SCALE_EFFECT);
    } else {
      return (1 - SCALE_INCREMENT) - (requestedScroll * SCROLL_SPEED_SCALE_EFFECT);
    }
  }

  const handleMouseWheel = (p5: p5Types, event: WheelEvent) => {
    const scaleAdjustment = getScaleAdjustment(event.deltaY);
    props.updateScaleFactor(props.scaleFactor * scaleAdjustment);
    // scaleFactor *= scaleAdjustment;
    props.updateTranslateX(p5.mouseX * (1 - scaleAdjustment) + props.translateX * scaleAdjustment);
    // translateX = p5.mouseX * (1 - scaleAdjustment) + translateX * scaleAdjustment;
    props.updateTranslateY(p5.mouseY * (1 - scaleAdjustment) + props.translateY * scaleAdjustment);
    // translateY = p5.mouseY * (1 - scaleAdjustment) + translateY * scaleAdjustment;
    // console.log(`scaleFactor ${scaleFactor}`);
    // console.log(`translateX ${translateX}`);
    // console.log(`translateY ${translateY}`);
    canResetView = true;
  };

  function setup(p5: p5Types) {
    console.log(`windowWidth: ${p5.windowWidth}`);
    console.log(`windowHeight: ${p5.windowHeight}`);
    if (props.canvas === undefined) {
      const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canvas.mouseWheel((event: WheelEvent) => handleMouseWheel(p5, event));
      props.updateCanvas(canvas);
    }
  }

  function drawCircle(p5: p5Types, topLeftCorner: Point, bottomRightCorner: Point) {
    const width = bottomRightCorner.xPos - topLeftCorner.xPos;
    const halfWidth = Math.floor(width / 2);
    const xCenter = topLeftCorner.xPos + halfWidth;
    const yCenter = topLeftCorner.yPos + halfWidth;
    p5.circle(xCenter, yCenter, width);
  }

  function drawNodes(p5: p5Types, nodes: HotNode[]) {
    nodes.forEach(node => drawCircle(p5, node.topLeftCorner, node.bottomRightCorner));
  }

  let frameCount = 0;
  function draw(p5: p5Types) {
    p5.background(255);
    p5.translate(props.translateX, props.translateY);
    p5.scale(props.scaleFactor);
    p5.translate(props.translateX, props.translateY);
    p5.scale(props.scaleFactor);
    if (frameCount % 50 === 0) {
      console.log(`mouseX: ${p5.mouseX}`);
      console.log(`mouseY: ${p5.mouseY}`);
    }

    // if (props.nodes[0]) {
    //   console.log(props.nodes[0].bottomRightCorner);
    // }
    drawNodes(p5, props.nodes);
    // drawNodes(p5, theseNodes);
    p5.rect(100, 100, 100, 100);
    p5.rect(50, 50, 100, 100);
    p5.circle(150, 150, 50);
    p5.text(p5.keyCode, 33, 65);

    if (p5.mouseIsPressed) {
      props.updateScaleFactor(1);
      props.updateTranslateX(props.translateX - p5.pmouseX - p5.mouseX);
      props.updateTranslateY(props.translateY - p5.pmouseY - p5.mouseY);
      canResetView = true;
    }
    if (canResetView && p5.keyIsDown(RESET_VIEW_KEY)) {
      props.updateScaleFactor(1);
      props.updateTranslateX(0);
      props.updateTranslateY(0);
      canResetView = false;
      console.log('reset');
    }
    frameCount += 1;
  }

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const doubleClicked = (p5: p5Types) => {
    const halfWidth = Math.floor(DEFAULT_NODE_WIDTH / 2) * props.scaleFactor;
    const halfHeight = Math.floor(DEFAULT_NODE_HEIGHT / 2) * props.scaleFactor;
    const topLeftCorner: Point = {
      xPos:  (p5.mouseX - halfWidth - props.translateX) / props.scaleFactor,
      yPos: (p5.mouseY - halfHeight - props.translateY) / props.scaleFactor
    };
    const bottomRightCorner: Point = {
      xPos: (p5.mouseX + halfWidth - props.translateX) / props.scaleFactor,
      yPos: (p5.mouseY + halfHeight - props.translateY) / props.scaleFactor
    };
    const newNode: HotNode = {
      topLeftCorner,
      bottomRightCorner,
      shape: 'Circle',
      thermalCapacitance: Qty('0 J/degK'),
      temperature: Qty('0 degC'),
      isBoundary: false
    };
    props.addNode(newNode);
  };

  return (
      <Sketch
          setup={setup}
          draw={draw}
          windowResized={windowResized}
          doubleClicked={doubleClicked}
      />
  );
}
