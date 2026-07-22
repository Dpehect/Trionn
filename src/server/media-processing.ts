import sharp from "sharp";
import { encode } from "blurhash";

export async function processImage(buffer:ArrayBuffer) {
  const source=Buffer.from(buffer);
  const image=sharp(source).rotate();
  const metadata=await image.metadata();
  const optimized=await image
    .resize({width:2400,height:2400,fit:"inside",withoutEnlargement:true})
    .avif({quality:72,effort:5})
    .toBuffer();

  const raw=await image.resize(32,32,{fit:"inside"}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const hash=encode(new Uint8ClampedArray(raw.data),raw.info.width,raw.info.height,4,3);

  return {
    buffer:optimized,
    mimeType:"image/avif",
    width:metadata.width ?? null,
    height:metadata.height ?? null,
    blurHash:hash,
  };
}
