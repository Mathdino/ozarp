"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Draws the Nova app screen onto a 2D canvas. Used as a live texture on the
// phone's display so the hero needs no external screenshot asset — the whole
// mock UI is generated procedurally and stays crisp at any size.
function makeScreenTexture() {
  const w = 512;
  const h = 1040;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0a0e1a";
  ctx.fillRect(0, 0, w, h);

  const pad = 40;

  // Status bar
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 26px Inter, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("9:41", pad, 46);
  ctx.textAlign = "right";
  ctx.fillText("5G  ●●●", w - pad, 46);
  ctx.textAlign = "left";

  // Greeting
  ctx.fillStyle = "#8a93a6";
  ctx.font = "500 24px Inter, sans-serif";
  ctx.fillText("Good morning", pad, 120);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px Inter, sans-serif";
  ctx.fillText("Nova", pad, 168);

  // Balance card (blue gradient)
  const cardY = 210;
  const cardH = 250;
  const grad = ctx.createLinearGradient(pad, cardY, w - pad, cardY + cardH);
  grad.addColorStop(0, "#0016EC");
  grad.addColorStop(1, "#4A83FF");
  roundRect(ctx, pad, cardY, w - pad * 2, cardH, 34);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 24px Inter, sans-serif";
  ctx.fillText("Total balance", pad + 34, cardY + 56);
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 62px Inter, sans-serif";
  ctx.fillText("$12,480.50", pad + 34, cardY + 128);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "600 24px Inter, sans-serif";
  ctx.fillText("+ $1,204 this month", pad + 34, cardY + 190);

  // Quick actions row
  const actY = 512;
  const labels = ["Send", "Request", "Top up", "Cards"];
  const gap = (w - pad * 2) / 4;
  labels.forEach((label, i) => {
    const cx = pad + gap * i + gap / 2;
    ctx.beginPath();
    ctx.arc(cx, actY, 34, 0, Math.PI * 2);
    ctx.fillStyle = "#141a2b";
    ctx.fill();
    ctx.fillStyle = "#4A83FF";
    ctx.font = "700 30px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("＋", cx, actY + 2);
    ctx.fillStyle = "#8a93a6";
    ctx.font = "500 20px Inter, sans-serif";
    ctx.fillText(label, cx, actY + 66);
    ctx.textAlign = "left";
  });

  // Mini spending chart (bars)
  const chY = 640;
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 26px Inter, sans-serif";
  ctx.fillText("Spending", pad, chY);
  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45];
  const bw = 34;
  const bgap = (w - pad * 2 - bw * bars.length) / (bars.length - 1);
  const baseY = chY + 150;
  bars.forEach((v, i) => {
    const bx = pad + i * (bw + bgap);
    const bh = v * 120;
    roundRect(ctx, bx, baseY - bh, bw, bh, 10);
    ctx.fillStyle = i === 3 ? "#4A83FF" : "#232b40";
    ctx.fill();
  });

  // Transactions
  const txns = [
    ["Spotify", "Music", "-$9.99"],
    ["Whole Foods", "Groceries", "-$48.20"],
    ["Salary", "Income", "+$3,200"],
  ];
  let ty = chY + 210;
  txns.forEach(([name, cat, amt]) => {
    ctx.beginPath();
    ctx.arc(pad + 22, ty + 6, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#141a2b";
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 24px Inter, sans-serif";
    ctx.fillText(name, pad + 62, ty);
    ctx.fillStyle = "#8a93a6";
    ctx.font = "500 20px Inter, sans-serif";
    ctx.fillText(cat, pad + 62, ty + 28);
    ctx.textAlign = "right";
    ctx.fillStyle = amt.startsWith("+") ? "#3ddc84" : "#ffffff";
    ctx.font = "600 24px Inter, sans-serif";
    ctx.fillText(amt, w - pad, ty + 12);
    ctx.textAlign = "left";
    ty += 78;
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const Phone = () => {
  const group = useRef();
  const screenTex = useMemo(() => makeScreenTexture(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.position.y = Math.sin(t * 0.8) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.4) * 0.35;
    group.current.rotation.x = Math.sin(t * 0.6) * 0.06 - 0.02;
  });

  return (
    <group ref={group} rotation={[0, -0.25, 0]}>
      {/* Phone body */}
      <RoundedBox args={[2.15, 4.4, 0.24]} radius={0.2} smoothness={6}>
        <meshStandardMaterial color="#0b0f1c" metalness={0.85} roughness={0.28} />
      </RoundedBox>

      {/* Metallic side frame accent */}
      <RoundedBox args={[2.2, 4.45, 0.2]} radius={0.22} smoothness={6}>
        <meshStandardMaterial color="#2a3350" metalness={1} roughness={0.35} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.13]}>
        <planeGeometry args={[1.94, 4.16]} />
        <meshStandardMaterial
          map={screenTex}
          emissive="#ffffff"
          emissiveMap={screenTex}
          emissiveIntensity={0.55}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Notch */}
      <mesh position={[0, 1.9, 0.14]}>
        <planeGeometry args={[0.6, 0.16]} />
        <meshStandardMaterial color="#0b0f1c" roughness={1} />
      </mesh>
    </group>
  );
};

const Phone3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#4A83FF" />
      <Environment preset="city" />
      <Phone />
    </Canvas>
  );
};

export default Phone3D;
