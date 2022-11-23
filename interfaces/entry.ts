export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

// definimos el typo de status para que solo acepte tres tipos; pending, in progress y finished
export type EntryStatus = "pending" | "in-progress" | "finished";
