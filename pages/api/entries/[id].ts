import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry;

// Para parametros variables podemos usar la misma estructura del fron, declaramos un archivo entre llaves [] indicando que el
// valor que llega por params es variable

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    default:
      res.status(200).json({ message: "Método no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // obtenemos el id cuando llegemos al endpoint
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  // comprobamos que no sea nulo
  if (!entryToUpdate) {
    db.disconnect();
    return res.status(400).json({ message: "No hay entrada con el id: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      // le pasamos el id del doc a actualizar
      id,
      // le pasamos también los datos a actualizar
      { description, status },
      { runValidators: true, new: true }
    );

    res.status(200).json(updatedEntry!);
    //   nuevamente, el signo de admiración al final de cualquier var indica que esa variable siempre va a tener un valor, nunca va
    // a ser "null"
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();
  const entryToFind = await Entry.findById(id);
  await db.disconnect();
  //
  if (!entryToFind) {
    return res.status(400).json({ message: "No hay entrada con el id: " + id });
  }
  //
  return res.status(200).json(entryToFind);
};
