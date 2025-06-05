import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

if (
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET ||
  !process.env.CLOUDINARY_CLOUD_NAME
) {
  throw new Error(
    "Las variables de entorno CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET deben estar definidas"
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se ha proporcionado ningún archivo" },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no válido. Utiliza JPG, PNG o WebP." },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString(
      "base64"
    )}`;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          folder: "rumble/student",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto:good" },
          ],
          format: "webp",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as UploadApiResponse);
          }
        }
      );
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return NextResponse.json(
      { error: "Error al procesar la imagen" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
