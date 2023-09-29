import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirebase } from "@/composables/useFirebase";

const { addDocument, getCollection } = useFirebase();

export const useCounterStore = defineStore("counter", () => {
  const collectionData = ref();
  const addDataInDb = () => {
    addDocument("test", {
      name: "george",
      surname: "khutiashvili",
    });
  }

  const getCollectionFromDb = (name: string) => {
    collectionData.value = getCollection(name);
  }

  return { addDataInDb, getCollectionFromDb, collectionData };
});
