"use server";

import { IPrice, IPriceData, IPriceDocument } from "@/type";
import { Price } from "../models/precio.model";
import { connectToMongoDB } from "../mongoose";

export const createPrice = async (body: IPrice): Promise<IPriceData> => {
  await connectToMongoDB();

  const totalPrices = await Price.countDocuments();
  if (totalPrices >= 6) {
    throw new Error("No se pueden tener más de 6 precios en total");
  }

  if (body.active) {
    const existingActivePrice = await Price.findOne({
      type: body.type,
      active: true,
    });
    if (existingActivePrice) {
      throw new Error("Ya existe un precio activo con este tipo");
    }
  }

  if (body.isPopular && body.active) {
    const pricePopular = await Price.findOne({ isPopular: true, active: true });
    if (pricePopular) {
      throw new Error("Ya existe un precio popular");
    }
  }

  const newPrice: IPriceData = await Price.create(body);

  return {
    _id: newPrice._id.toString(),
    id: newPrice._id.toString(),
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
};

export const getPrices = async (
  active: boolean | undefined = undefined
): Promise<string> => {
  try {
    await connectToMongoDB();
    let prices: IPriceDocument[];

    if (active !== undefined) {
      prices = await Price.find({ active });
    } else {
      prices = await Price.find();
    }

    prices = await Price.find();

    const serializedPrices = prices.map((price) => ({
      _id: price._id.toString(),
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

  if (data.active) {
    const existingActivePrice = await Price.findOne({
      _id: { $ne: id },
      type: data.type,
      active: true,
    });
    if (existingActivePrice) {
      throw new Error("Ya existe un precio activo con este tipo");
    }
  }

  if (priceSearch.type !== data.type) {
    const existingPrice = await Price.findOne({
      _id: { $ne: id },
      type: data.type,
      active: data.active,
    });
    if (existingPrice) {
      throw new Error("Ya existe un precio con este tipo");
    }
  }

  if (data.isPopular) {
    const pricePopular = await Price.findOne({
      _id: { $ne: id },
      isPopular: true,
      active: data.active,
    });
    if (pricePopular) {
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
    if (price.isPopular && !price.active) {
      throw new Error("No se puede desactivar un precio popular");
    }

    const activePrices = await Price.find({ active: true });
    if (activePrices.length <= 1 && !price.active) {
      throw new Error("Debe haber al menos un precio activo");
    }

    // no se puede activar un precio si existe otro precio activo con el mismo tipo
    const existingPrice = await Price.findOne({
      type: price.type,
      active: true,
    });
    if (existingPrice && !price.active) {
      throw new Error("Ya existe un precio activo con este tipo");
    }

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

export const getPriceById = async (
  id: string
): Promise<Omit<IPriceData, "id">> => {
  await connectToMongoDB();

  const price = await Price.findById(id);
  if (!price) {
    throw new Error("Precio no encontrado");
  }
  return {
    _id: price._id,
    name: price.name,
    type: price.type,
    price: price.price,
    class: price.class,
    description: price.description,
    characteristics: price.characteristics,
    active: price.active,
    isPopular: price.isPopular,
    createdAt: price.createdAt?.toString?.() ?? null,
    updatedAt: price.updatedAt?.toString?.() ?? null,
  };
};
