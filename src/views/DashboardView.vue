<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonFooter, IonToolbar, IonToast, IonSpinner } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BButton from '@/components/base/B-Button.vue';
import { useLocalStorage } from "@/composables/useLocalStorage";
import { useFirebase } from '@/composables/useFirebase';
import { useUsersStore } from '@/pinia/userStore';
import { useManageStorageProducts } from '@/pinia/productsStore';

const { getLocalStorageItem } = useLocalStorage();
const { addDocument, getDocument, setDocument } = useFirebase();

const productsStore = useManageStorageProducts();
const userStore = useUsersStore();
const router = useRouter();

const userRestaurants = ref();

onMounted(async () => {
    let userUid = getLocalStorageItem('uid');
    const userData = await getDocument('users/' + userUid);
    if (userData.data) {
        userStore.setUserData(userData);
        productsStore.setFirebaseRestaurantsReference('users/' + userUid + '/restaurants');
        // store.setFirebaseEmployeesReference('users/' + userUid + '/employees');
        userRestaurants.value = await userStore.getUserRestaurants(userUid);
    } else {
        await setDocument('users/' + userUid);
        // add restaurants and employees when neeeded, and not immediately..
        // await addDocument('users/' + userUid + '/restaurants', {});
        // await addDocument('users/' + userUid + '/employees', {});
    }
});
</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Bipper - Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :forceOverscroll="false" :fullscreen="true" color="secondary">
            <ion-header collapse="condense">
                <ion-toolbar color="secondary">
                    <ion-title size="large">Bipper.</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="flex w-full h-4/5 flex-col p-3 items-center justify-around gap-5">
                <div v-if="userRestaurants && userRestaurants.length === 0" class="flex flex-col gap-20">
                    <div class="bg-white shadow-md rounded-lg overflow-hidden mx-5">
                        <div class="px-5 py-4">
                            <h2 class="text-xl font-semibold pb-2 text-center">Using Bipper is straightforward</h2>
                            <p class="text-gray-700 mb-2 pt-1">1. Add a restaurant you want to manage inventory for. </p>
                            <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">2. Add products to the restaurant.
                            </p>
                            <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">3. Assign employees to handle
                                product management. </p>
                            <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">4. Bipper will handle the rest for
                                you!</p>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-2xl capitalize text-center">You Don't have any restaurants</h2>
                        <BButton class="my-6">
                            <template #title>Add New</template>
                        </BButton>
                    </div>
                </div>
                <!-- <h2 class="text-2xl">Your Restaurants</h2> show restaurants list related to this user {{ userRestaurants }} -->
            </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar class="ion-text-center">
                <!-- <p>Tip: Any Passcode Works for now</p> -->
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>



<style scoped></style>