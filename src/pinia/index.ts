import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirebase } from "@/composables/useFirebase";

const { addDocument, getCollection, updateDocument, getDocument } = useFirebase();

export const useManageStorageProducts = defineStore("manageProducts", () => {
  const collectionData = ref<ProductData[]>([]);
  const firebaseRestaurantsReference = ref<string>('');
  const loading = ref(false);
  const toastBody = ref({
    show: false,
    message: "",
    type: "success"
  });

  const addDataInDb = async(data: object) => {
    loading.value = true;
    try {
      await addDocument(firebaseRestaurantsReference.value, data);
      loading.value = false;
      showToast('open', 'success', 'Product Added Successfully');
    } catch(e) {
      console.log(e);
      showToast('open', 'error');
      loading.value = false;
    }
  };

  const updateProduct = async(product: ProductData) => {
    loading.value = true;
    try {
      await updateDocument(firebaseRestaurantsReference.value, JSON.parse(JSON.stringify(product)));
      loading.value = false;
      showToast('open', 'success', 'Product Updated Successfully');
    } catch(e) {
      console.log(e);
      loading.value = false;
    }
  };

  const takeOutProduct = async (product: ProductData) => {
    loading.value = true;
    try {
      await updateDocument(firebaseRestaurantsReference.value, JSON.parse(JSON.stringify(product)));
      loading.value = false;
      showToast('open', 'success', 'Product Taken Successfully');
    } catch(e) {
      console.log(e);
      loading.value = false;
    }
  }

  const getCollectionFromDb = async () => {
    loading.value = true;
    collectionData.value = [];
    try {
      const response = await getCollection(firebaseRestaurantsReference.value);
      response.forEach(el => {
        if (el.data.name) {
          collectionData.value.push({ ...el.data, id: el.id } as ProductData);
        }
      });
      loading.value = false;
    } catch(e) {
      console.log(e);
      loading.value = false;
    }
  };


  const showToast = (action: string, type?: string | null, message?: string | null) => {
    if (action === 'open') {
      if (type === 'success') {
        toastBody.value.show = true;
        message && message.length > 0 ? toastBody.value.message = message : toastBody.value.message = "Product Added Successfully";
        /// dark is meant as success in this context
        toastBody.value.type = 'dark';
      } else {
        toastBody.value.show = true;
        toastBody.value.message = "Error Occurred";
        toastBody.value.type = 'error';
      }
    } else {
      toastBody.value.show = false;
    }
  }

  const getProductById = (id: string | string[]) => {
    return collectionData.value.filter(item => item.id === id)[0];
  }

  const setFirebaseRestaurantsReference = (reference: string) => {
    firebaseRestaurantsReference.value = reference; 
  } 


  return { addDataInDb, getCollectionFromDb, collectionData, loading, toastBody, showToast, getProductById, takeOutProduct, updateProduct, setFirebaseRestaurantsReference };
});
