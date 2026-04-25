"use client";

import { useEffect, useRef } from "react";
import type { Theme } from "@/lib/themes";

interface PixelTitleProps {
  theme: Theme;
}

const PIXEL_FONT: Record<string, number[][]> = {
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  " ": [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
};

const PIXEL_SIZE = 8;
const LETTER_GAP = 3;
const ROWS = 7;
const SHADOW_OFFSET = 3;
const TITLE = "HI BUDDY";

function getCanvasWidth(): number {
  const totalWidth = TITLE.split("").reduce((acc, char, index, arr) => {
    const cols = PIXEL_FONT[char][0].length;
    const charWidth = cols * PIXEL_SIZE;
    const gap = index === arr.length - 1 ? 0 : LETTER_GAP;
    return acc + charWidth + gap;
  }, 0);

  return totalWidth + SHADOW_OFFSET + 4;
}

function getCanvasHeight(): number {
  return ROWS * PIXEL_SIZE + SHADOW_OFFSET + 12;
}

export default function PixelTitle({ theme }: PixelTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = getCanvasWidth();
  const canvasHeight = getCanvasHeight();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, theme.colors.titleGradientFrom);
    grad.addColorStop(0.5, theme.colors.titleGradientMid);
    grad.addColorStop(1, theme.colors.titleGradientTo);

    let cursorX = 2;

    TITLE.split("").forEach((char) => {
      const grid = PIXEL_FONT[char];
      const cols = grid[0].length;

      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          if (grid[row][col] === 1) {
            const px = cursorX + col * PIXEL_SIZE;
            const py = 2 + row * PIXEL_SIZE;

            ctx.fillStyle = "rgba(0,0,0,0.45)";
            ctx.fillRect(
              px + SHADOW_OFFSET,
              py + SHADOW_OFFSET,
              PIXEL_SIZE - 1,
              PIXEL_SIZE - 1
            );

            ctx.fillStyle = theme.colors.titleGradientTo;
            ctx.fillRect(px - 1, py - 1, PIXEL_SIZE + 1, PIXEL_SIZE + 1);

            ctx.fillStyle = grad;
            ctx.fillRect(px, py, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
          }
        }
      }

      cursorX += cols * PIXEL_SIZE + LETTER_GAP;
    });
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ imageRendering: "pixelated", display: "block" }}
    />
  );
}
