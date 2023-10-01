import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirebase } from "@/composables/useFirebase";

const { addDocument, getCollection } = useFirebase();

export const useCounterStore = defineStore("counter", () => {
  const collectionData = ref();
  const addDataInDb = (data: object) => {
    addDocument("testcollection", data);
  };

  const getCollectionFromDb = async (name: string) => {
    collectionData.value = await getCollection(name);
  };

  return { addDataInDb, getCollectionFromDb, collectionData };
});
