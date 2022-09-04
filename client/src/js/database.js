import { openDB } from "idb";

const initdb = async () =>
  // create new database named jate, version 1
  openDB("jate_db", 1, {
    // Add database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate store already exists");
        return;
      }
      // create new store and set auto increment key to 'id'
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate store created");
    },
  });

// accepts some content
// and adds it to the database
export const putDb = async (content) => {
  console.log("putDb");
  const jateDb = await openDB("jate_db", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // Use the .put() method on the store and pass in the content.
  const request = store.put({
    content: content,
  });
  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// gets
// all the content from the database
export const getDb = async () => {
  console.log("getDb");
  const jateDb = await openDB("jate_db", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
