interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: This is the description",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En progreso: This is the description for obj 2",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      description: "Terminadas: This is the description for obj 3",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};
