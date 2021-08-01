import Dexie from "dexie";

const db = new Dexie("ReactReduxSampleDB");
db.version(1).stores({ images: "++id, tierlistId", tierlists: "++id, status, date", items: "++id, name, resides, tierlistId, [tierlistId+resides], [tierlistId+name]"});

export default db;
