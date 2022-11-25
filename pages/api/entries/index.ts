import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | { message: string }
  | IEntry[]
  //   es neceario darle este tipo de entrada a "entries" para que el res.json sepa como lucen los datos
  | IEntry;

// métodos de creación de Entries en el back
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

// método para obtener todas las entradas por tipo createdAt
const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();
  //
  res.status(200).json(entries);
};

// método para crear una nueva entrada
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
  // predefinimos o especificamos solo los campos o propiedades que necesito, puede ser que al momento de crear el documento
  // se envien datos por ejemplo en el campo del createdAt y esto sobre escriba lo que tenemos, así que predefinimos solo los
  // datos que queremos

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del server" });
  }
};
