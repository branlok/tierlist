import Dexie from "dexie";

const db = new Dexie("ReactReduxSampleDB");

// db.version(1).stores({ images: "++id, tierlistId, dateAdded", tierlists: "++id, status, date", items: "++id, name, resides, tierlistId, [tierlistId+resides], [tierlistId+name]"});
db.version(2).stores({
  images: "++id, tierlistId, dateAdded, fileName",
  tierlists: "++id, status, date, title, lastEdited",
  items:
    ", id, name, resides, tierlistId, [tierlistId+resides], [tierlistId+name], [id+tierlistId]",
});

export default db;
