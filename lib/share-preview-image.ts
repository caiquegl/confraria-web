import sharp from "sharp";

const MAX_BYTES = 300_000;
const WIDTH = 1200;
const HEIGHT = 630;

export async function renderSharePreview(input: Buffer) {
  let quality = 80;
  let output = await renderJpeg(input, quality);

  while (output.length > MAX_BYTES && quality > 45) {
    quality -= 8;
    output = await renderJpeg(input, quality);
  }

  return output;
}

function renderJpeg(input: Buffer, quality: number) {
  return sharp(input)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ mozjpeg: true, quality })
    .toBuffer();
}
