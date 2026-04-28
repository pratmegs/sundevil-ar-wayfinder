import { recognize } from "tesseract.js";

const OCR_LANGUAGE = "eng";
const OCR_SCALE = 0.6;

export async function runOcr(video, canvas) {
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Unable to prepare OCR canvas.");
  }

  const width = Math.max(1, Math.floor(video.videoWidth * OCR_SCALE));
  const height = Math.max(1, Math.floor(video.videoHeight * OCR_SCALE));

  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);

  const imageDataUrl = canvas.toDataURL("image/png");
  const result = await recognize(imageDataUrl, OCR_LANGUAGE);

  return result.data.text;
}
