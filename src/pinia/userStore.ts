import { defineStore } from "pinia";
import { ref } from "vue";
import { useFirebase } from "@/composables/useFirebase";
const { getCollection, deleteDocument, updateDocument } = useFirebase();

export const useUsersStore = defineStore("Users Store", () => {
    const userData = ref();
    const loading = ref(true);
    const firebaseRestaurantsReference = ref<string>('');
    const userRestaurants = ref<UserRestaurants[]>([]);
    const toastBody = ref({
        show: false,
        message: "",
        type: "success"
    });


    const getUserRestaurants = async (userUid: string) => {
        userRestaurants.value = [];
        loading.value = true;
        const resp = await getCollection('users/' + userUid + '/restaurants');
        resp.forEach(el => {
            if (el.data) {
                userRestaurants.value.push({ ...el.data, id: el.id } as UserRestaurants);
            }
        });
        loading.value = false;
        return resp;
    }

    const setUserData = (data: object) => {
        loading.value = true;
        userData.value = data;
        loading.value = false;
    }

    const getRestaurantById = (id: string) => {
        return userRestaurants.value.filter(item => item.id === id);
    }

    const deleteRestaurant = async (id: string) => {
        loading.value = true;
        try {
            await deleteDocument(id);
            showToast('open', 'success', 'Product Deleted Successfully');
        } catch (e) {
            console.log(e);
            showToast('open', 'error', 'Erorr Occured');
        }
        loading.value = false;
    }

    const setFirebaseRestaurantsReference = (reference: string) => {
        firebaseRestaurantsReference.value = reference;
    }
    const updateRestaurant = async (reference: string, restaurantData: ProductData) => {
        loading.value = true;
        try {
            await updateDocument(reference, JSON.parse(JSON.stringify(restaurantData)));
            loading.value = false;
            showToast('open', 'success', 'Restaurant Updated Successfully');
        } catch (e) {
            loading.value = false;
            return e;
        }
    };

    const showToast = (action: string, type?: string | null, message?: string | null) => {
        if (action === 'open') {
            if (type === 'success') {
                toastBody.value.show = true;
                message && message.length > 0 ? toastBody.value.message = message : toastBody.value.message = "Restaurant Deleted";
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
    return { getUserRestaurants, setUserData, userData, loading, userRestaurants, deleteRestaurant, showToast, toastBody, getRestaurantById, updateRestaurant, setFirebaseRestaurantsReference, firebaseRestaurantsReference }
});