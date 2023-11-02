import { defineStore } from "pinia";
import { ref } from "vue";
import { useFirebase } from "@/composables/useFirebase";

export const useUsersStore = defineStore("Users Store", () => {
    const userData = ref();
    const { getCollection } = useFirebase();
    
    const getUserRestaurants = async (userUid: string) => {
        return await getCollection('users/' + userUid + '/restaurants');
    }

    const setUserData = (data: object) => {
        userData.value = data;
    }
    return { getUserRestaurants, setUserData, userData}
});