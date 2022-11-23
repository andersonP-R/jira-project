import { FC, PropsWithChildren, useContext, useMemo } from "react";
import { DragEvent } from "react";

import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";

import { EntryCard } from "./";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<PropsWithChildren<Props>> = ({ status }) => {
  const { isDragging, endDragging } = useContext(UIContext);
  const { entries, updateEntry } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    console.log({ id });

    const entry = entries.find((e) => e._id === id)!;
    // .find() puede devolver un valor (en este caso el id que buscamos) o undefined. El signo de admiración al final indica que
    // siempre vamos a devolver un valor. No va a haber un valor "undefined". Esto lo hacemos por que etamos 100% seguros de que
    // siempre vamos a devolver, en este caso un _id.
    //
    entry.status = status;
    // re asignamos el nuevo estado que nos llega por parametro (status)
    updateEntry(entry);
    // Lanzamos el dispatch con la nueva entrada
    endDragging();
    // Indicamos que ya se termino de hacer drag
  };

  return (
    // div para el drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
        }}
      >
        {/* todo: cambiara dependiendo si esta haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
