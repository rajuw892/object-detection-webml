import { DetectedObject } from "@tensorflow-models/coco-ssd";

export function drawOnCanvas(
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined | any
) {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox, score } = detectedObject;
    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();

      // // Fill color
      // ctx.fillStyle = name === "person" ? "#FF0F0F" : "#00B612";
      // ctx.globalAlpha = 0.4;

      // Stroke color
      ctx.strokeStyle = name === "person" ? "#FF0000" : "#00FF00";
      ctx.lineWidth = 2;

      // Draw rectangle
      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8)
        : ctx.roundRect(x, y, width, height, 8);

      // Fill and stroke
      // ctx.fill();
      ctx.stroke();

      // Text styling
      ctx.font = "12px Courier New";
      ctx.fillStyle = "black";
      ctx.globalAlpha = 1;

      // Draw class name
      mirrored
        ? ctx.fillText(name, ctx.canvas.width - x - width + 10, y + 20)
        : ctx.fillText(name, x + 10, y + 20);

      // Draw score
      mirrored
        ? ctx.fillText(
            `Score: ${score.toFixed(2)}`,
            ctx.canvas.width - x - width + 10,
            y + 40
          )
        : ctx.fillText(`Score: ${score.toFixed(2)}`, x + 10, y + 40);
    }
  });
}
