function baseTierlistMaker(id) {
  return {
    items: {},
    rows: {
      "row-1": {
        id: "row-1",
        name: "S TIER",
        description: "Lorem ipsum",
        itemOrder: [],
        meta: {},
      },
      "row-2": {
        id: "row-2",
        name: "A TIER",
        description: "Lorem ipsum",
        itemOrder: [],
      },
      "row-3": {
        id: "row-3",
        name: "B TIER",
        description: "Lorem ipsum",
        itemOrder: [],
      },
      "row-4": {
        id: "row-4",
        name: "C TIER",
        description: "Lorem ipsum",
        itemOrder: [],
      },
      "row-5": {
        id: "row-5",
        name: "D TIER",
        description: "Lorem ipsum",
        itemOrder: [],
      },
      "row-6": {
        id: "row-6",
        name: "E TIER",
        description: "Lorem ipsum",
        itemOrder: [],
      },
      storage: {
        id: "storage",
        name: "Storage",
        description: "Lorem ipsum",
        itemOrder: [],
      },
    },
    rowOrder: ["row-1", "row-2", "row-3", "row-4", "row-5", "row-6", "storage"],
    tierlist: {
      id,
      title: "New Tierlist",
      description: "",
      status: "draft",
      size: "original",
      theme: "default",
      lastModified: Date.now(),
      lastCreated: Date.now(),
    },
  };
}

// let initialState = {
//   items: {},
//   rows: {
//     "row-1": {
//       id: "row-1",
//       name: "S TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//       meta: {},
//     },
//     "row-2": {
//       id: "row-2",
//       name: "A TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//     "row-3": {
//       id: "row-3",
//       name: "B TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//     "row-4": {
//       id: "row-4",
//       name: "C TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//     "row-5": {
//       id: "row-5",
//       name: "D TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//     "row-6": {
//       id: "row-6",
//       name: "E TIER",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//     storage: {
//       id: "storage",
//       name: "Storage",
//       description: "Lorem ipsum",
//       itemOrder: [],
//     },
//   },
//   rowOrder: ["row-1", "row-2", "row-3", "row-4", "row-5", "row-6", "storage"],
//   tierlist: {
//     id,
//     title: "tierlist Name",
//     description: "lorem ipsum",
//     status: "draft",
//     lastCreated: Date.now(),
//   },
// };

export default baseTierlistMaker;
