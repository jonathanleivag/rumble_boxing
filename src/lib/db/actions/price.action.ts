"use server";

import { IPrice, IPriceData, IPriceDocument } from "@/type";
import { Price } from "../models/precio.model";
import { connectToMongoDB } from "../mongoose";

export const createPrice = async (body: IPrice): Promise<IPriceData> => {
  try {
    await connectToMongoDB();

    const price = await Price.findOne({ type: body.type, active: true });

    if (price) {
      throw new Error("Ya existe un precio con este tipo");
    }

    const pricePopular = await Price.findOne({ isPopular: true, active: true });
    console.log("pricePopular", { pricePopular });

    if (body.isPopular && pricePopular) {
      throw new Error("Ya existe un precio popular");
    }

    const newPrice = await Price.create(body);

    return {
      _id: newPrice._id,
      name: newPrice.name,
      type: newPrice.type,
      price: newPrice.price,
      class: newPrice.class,
      description: newPrice.description,
      characteristics: newPrice.characteristics,
      active: newPrice.active,
      isPopular: newPrice.isPopular,
      createdAt: newPrice.createdAt,
      updatedAt: newPrice.updatedAt,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear precio:", error.message);
      throw new Error("Error al crear precio: " + error.message);
    }
    console.error("Error al crear precio:", error);
    throw new Error("Error al crear precio");
  }
};

export const getPrices = async (): Promise<string> => {
  try {
    await connectToMongoDB();

    const prices: IPriceDocument[] = await Price.find();

    const serializedPrices = prices.map((price) => ({
      _id: price._id,
      name: price.name,
      description: price.description,
      type: price.type,
      price: price.price,
      active: price.active,
      isPopular: price.isPopular,
      class: price.class,
      characteristics: price.characteristics,
      createdAt: price.createdAt?.toString?.() ?? null,
      updatedAt: price.updatedAt?.toString?.() ?? null,
    }));

    return JSON.stringify(serializedPrices);
  } catch (error) {
    console.error("Error al obtener precios:", error);
    throw new Error("Error al obtener precios");
  }
};

export const putPrice = async (id: string, data: IPrice): Promise<string> => {
  await connectToMongoDB();

  const priceSearch = await Price.findById(id);
  if (!priceSearch) {
    throw new Error("Precio no encontrado");
  }
  if (priceSearch.type !== data.type) {
    const existingPrice = await Price.findOne({
      type: data.type,
      active: true,
    });
    if (existingPrice) {
      throw new Error("Ya existe un precio con este tipo");
    }
  }
  if (priceSearch.isPopular && !data.isPopular) {
    const pricePopular = await Price.findOne({ isPopular: true, active: true });
    if (data.isPopular && pricePopular) {
      throw new Error("Ya existe un precio popular");
    }
  }
  const updatedPrice = await Price.findByIdAndUpdate(
    id,
    {
      ...data,
      updatedAt: new Date(),
    },
    { new: true }
  );
  if (!updatedPrice) {
    throw new Error("Precio no encontrado");
  }
  return JSON.stringify({
    _id: updatedPrice._id,
    name: updatedPrice.name,
    type: updatedPrice.type,
    price: updatedPrice.price,
    class: updatedPrice.class,
    description: updatedPrice.description,
    characteristics: updatedPrice.characteristics,
    active: updatedPrice.active,
    isPopular: updatedPrice.isPopular,
    createdAt: updatedPrice.createdAt?.toString?.() ?? null,
    updatedAt: updatedPrice.updatedAt?.toString?.() ?? null,
  });
};

export const deletePrice = async (id: string): Promise<string> => {
  await connectToMongoDB();

  const deletedPrice = await Price.findByIdAndDelete(id);

  if (!deletedPrice) {
    throw new Error("Precio no encontrado");
  }

  return id;
};

export const patchPrice = async (id: string, action: string) => {
  await connectToMongoDB();

  const price = await Price.findById(id);

  if (!price) {
    throw new Error("Precio no encontrado");
  }

  if (action === "toggleActive") {
    price.active = !price.active;
  } else if (action === "togglePopular") {
    if (!price.isPopular) {
      await Price.updateMany({}, { isPopular: false });
    }
    price.isPopular = !price.isPopular;
  } else {
    throw new Error("Acción no válida");
  }
  await price.save();
};
