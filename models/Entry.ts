import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

// usamos la interface Entry para que la IEntry (interface) que estamos creando, tome las propiedades y sus tipos
export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
    default: "pending",
    // asignamos el default en pending para asignar un value por defecto al momento de crear una nueva entrada
  },
});

// el primer valor que asignamos a EntryModel es el que se le da cuando ya se ha creado un modelo (mongoose.models.Entry).
// el segundo valor es el que se le da cuando creamos por primera vez nuestro modelo de entradas (mongoose.model.("Entry", entrySchema))
const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
