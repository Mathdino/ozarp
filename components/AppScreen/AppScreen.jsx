"use client";

import React, { useEffect, useRef } from "react";

// Lightweight 2D app-screen mock (no WebGL). Draws a Nova "Insights" screen
// onto a canvas so the about section shows a real-looking app view without
// shipping an image asset.
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function draw(canvas) {
  const w = 720;
  const h = 900;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0a0e1a";
  ctx.fillRect(0, 0, w, h);

  const pad = 56;
  ctx.textBaseline = "middle";

  // Header
  ctx.fillStyle = "#8a93a6";
  ctx.font = "500 26px Inter, sans-serif";
  ctx.fillText("Insights", pad, 70);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 46px Inter, sans-serif";
  ctx.fillText("This month", pad, 128);

  // Big spend figure
  ctx.fillStyle = "#4A83FF";
  ctx.font = "700 72px Inter, sans-serif";
  ctx.fillText("$2,140", pad, 210);
  ctx.fillStyle = "#8a93a6";
  ctx.font = "500 24px Inter, sans-serif";
  ctx.fillText("spent · 18% less than last month", pad, 262);

  // Line chart
  const cx = pad;
  const cw = w - pad * 2;
  const cy = 320;
  const chH = 180;
  const pts = [0.5, 0.35, 0.6, 0.45, 0.7, 0.55, 0.85, 0.65];
  ctx.strokeStyle = "#4A83FF";
  ctx.lineWidth = 6;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const px = cx + (cw / (pts.length - 1)) * i;
    const py = cy + chH - p * chH;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.stroke();
  // area fill
  const g = ctx.createLinearGradient(0, cy, 0, cy + chH);
  g.addColorStop(0, "rgba(74,131,255,0.35)");
  g.addColorStop(1, "rgba(74,131,255,0)");
  ctx.lineTo(cx + cw, cy + chH);
  ctx.lineTo(cx, cy + chH);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();

  // Category rows
  const cats = [
    ["Groceries", "$540", 0.8, "#4A83FF"],
    ["Transport", "$210", 0.4, "#3ddc84"],
    ["Subscriptions", "$96", 0.2, "#f5a623"],
  ];
  let ry = 600;
  cats.forEach(([name, amt, frac, col]) => {
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 28px Inter, sans-serif";
    ctx.fillText(name, pad, ry);
    ctx.textAlign = "right";
    ctx.fillStyle = "#8a93a6";
    ctx.fillText(amt, w - pad, ry);
    ctx.textAlign = "left";
    // progress bar
    roundRect(ctx, pad, ry + 26, cw, 14, 7);
    ctx.fillStyle = "#1a2135";
    ctx.fill();
    roundRect(ctx, pad, ry + 26, cw * frac, 14, 7);
    ctx.fillStyle = col;
    ctx.fill();
    ry += 92;
  });
}

const AppScreen = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) draw(ref.current);
  }, []);
  return (
    <canvas
      ref={ref}
      className="w-full h-full object-cover"
      style={{ display: "block" }}
      aria-label="Nova app insights screen"
    />
  );
};

export default AppScreen;
