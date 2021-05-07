import useLast from "./useLast";
import useMousePos from "./useMousePos";
import {
  addPoints,
  diffPoints,
  makePoint,
  ORIGIN,
  Point,
  scalePoint,
} from "../pointUtils";
import config from "../../../config";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AppNode } from "../../App";

const { maxZoom, minZoom, zoomSensitivity } = config;

export default function usePanZoomCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  canvasWidth: number,
  canvasHeight: number
): [
  CanvasRenderingContext2D | null,
  (context: CanvasRenderingContext2D) => void,
  (context: CanvasRenderingContext2D, nodes: AppNode[]) => void,
  Point,
  Point,
  number,
  (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
] {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<Point>(ORIGIN);
  const [viewportTopLeft, setViewportTopLeft] = useState<Point>(ORIGIN);
  const lastOffsetRef = useLast<Point>(offset);
  const lastMousePosRef = useRef<Point>(ORIGIN);
  const [mousePos, setMousePos] = useMousePos(canvasRef);
  const isResetRef = useRef<boolean>(false);

  const adjustForDevice = useCallback(() => {
    if (context) {
      // adjust for device pixel density
      const { devicePixelRatio: ratio = 1 } = window;
      context.canvas.width = canvasWidth * ratio;
      context.canvas.height = canvasHeight * ratio;
      context.scale(ratio, ratio);
      setScale(1);
    }
  }, [canvasHeight, canvasWidth, context]);

  // reset
  const reset = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (context && !isResetRef.current) {
        adjustForDevice();

        // reset state and refs
        setContext(context);
        setOffset(ORIGIN);
        setMousePos(ORIGIN);
        setViewportTopLeft(ORIGIN);
        lastOffsetRef.current = ORIGIN;
        lastMousePosRef.current = ORIGIN;

        // this thing is so multiple resets in a row don't clear canvas
        isResetRef.current = true;
      }
    },
    [adjustForDevice, setMousePos, lastOffsetRef]
  );

  // zoom to fit
  const zoomToFit = useCallback(
    (context: CanvasRenderingContext2D, nodes: AppNode[]) => {
      if (context && !isResetRef.current) {
        const { devicePixelRatio: ratio = 1 } = window;
        context.canvas.width = canvasWidth * ratio;
        context.canvas.height = canvasHeight * ratio;
        context.scale(ratio, ratio);

        const centroidX =
          nodes.reduce((prevVal, node) => node.center.x + prevVal, 0) /
          nodes.length;
        const canvasWidth = context.canvas.width / ratio;
        const centerX = -centroidX + canvasWidth / 2;

        const centroidY =
          nodes.reduce((prevVal, node) => node.center.y + prevVal, 0) /
          nodes.length;
        const canvasHeight = context.canvas.height / ratio;
        const centerY = -centroidY + canvasHeight / 2;

        const center = makePoint(centerX, centerY);

        // reset state and refs
        setContext(context);
        setOffset(center);

        const minX = Math.min(...nodes.map((node) => node.center.x));
        const maxX = Math.max(...nodes.map((node) => node.center.x));
        const minY = Math.min(...nodes.map((node) => node.center.y));
        const maxY = Math.max(...nodes.map((node) => node.center.y));

        const significantDimension =
          Math.min(canvasHeight / (maxY - minY), canvasWidth / (maxX - minX)) *
          0.8; // TODO: MAKE FACTOR

        // context.scale(significantDimension, significantDimension);
        // context.translate(
        //   center.x / significantDimension,
        //   center.y / significantDimension
        // );
        // setScale(significantDimension);
        setMousePos(ORIGIN);
        setViewportTopLeft(ORIGIN);
        lastOffsetRef.current = ORIGIN;
        lastMousePosRef.current = ORIGIN;

        // this thing is so multiple resets in a row don't clear canvas
        isResetRef.current = true;
      }
    },
    [adjustForDevice, setMousePos, lastOffsetRef]
  );

  // reset pixels on canvas dimension change
  useLayoutEffect(() => {
    if (context) {
      adjustForDevice();
    }
  }, [adjustForDevice, canvasHeight, canvasWidth, context]);

  // functions for panning
  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (context) {
        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY }; // use document so can pan off element
        lastMousePosRef.current = currentMousePos;

        const mouseDiff = diffPoints(currentMousePos, lastMousePos);
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
      }
    },
    [context]
  );

  const mouseUp = useCallback(() => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const startPan = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    },
    [mouseMove, mouseUp]
  );

  // pan when offset or scale changes
  useLayoutEffect(() => {
    if (context && lastOffsetRef.current) {
      const offsetDiff = scalePoint(
        diffPoints(offset, lastOffsetRef.current),
        scale
      );
      context.translate(offsetDiff.x, offsetDiff.y);
      setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff));
      isResetRef.current = false;
    }
  }, [context, offset, lastOffsetRef, scale]);

  // add event listener on canvas for zoom
  useLayoutEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) {
      return;
    }

    // this is tricky. Update the viewport's "origin" such that
    // the mouse doesn't move during scale - the 'zoom point' of the mouse
    // before and after zoom is relatively the same position on the viewport
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (context) {
        const zoom = 1 - event.deltaY / zoomSensitivity;
        const newScale = scale * zoom;
        if (newScale > maxZoom || newScale < minZoom) {
          return;
        }

        const viewportTopLeftDelta = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom),
        };
        const newViewportTopLeft = addPoints(
          viewportTopLeft,
          viewportTopLeftDelta
        );

        context.translate(viewportTopLeft.x, viewportTopLeft.y);
        context.scale(zoom, zoom);
        context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

        setViewportTopLeft(newViewportTopLeft);
        setScale(newScale);
        isResetRef.current = false;
      }
    }

    canvasElem.addEventListener("wheel", handleWheel);
    return () => canvasElem.removeEventListener("wheel", handleWheel);
  }, [canvasRef, context, mousePos.x, mousePos.y, viewportTopLeft, scale]);

  return [context, reset, zoomToFit, viewportTopLeft, offset, scale, startPan];
}
