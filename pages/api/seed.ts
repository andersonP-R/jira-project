import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

type Data = {
  message: string;
};

// ESTA RUTA ES PARA PUGAR LA DB, EL ENDPOINT BORRA LO QUE TENGA LA DB Y LE INSERTA DATOS DE PRUEBA. ESTO SOLO SE DEBE HACER EN
// DESARROLLO Y CUANDO SE INICIA POR PRIMERA VEZ CON EL PROYECTO. NO SE DEBE EJECUTAR NUNCA EN PRODUCCIÓN.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio" });
  }

  await db.connect();
  // aqui es donde hacemos la interacción con la db
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
