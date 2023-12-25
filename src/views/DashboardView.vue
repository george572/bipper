<script setup lang="ts">
import { IonContent, IonHeader, onIonViewWillEnter, IonPage, IonTitle, IonFooter, IonToolbar, IonToast, IonSpinner, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { ChevronRight, LogOut } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import BButton from '@/components/base/B-Button.vue';
import { useLocalStorage } from "@/composables/useLocalStorage";
import { useFirebase } from '@/composables/useFirebase';
import { useUsersStore } from '@/pinia/userStore';
import { useManageStorageProducts } from '@/pinia/productsStore';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth';
const { getLocalStorageItem } = useLocalStorage();
const { addDocument, getDocument, setDocument } = useFirebase();

const productsStore = useManageStorageProducts();
const userStore = useUsersStore();
const router = useRouter();

const { deleteLocalStorageItem} = useLocalStorage();
const { signOut } = useFirebaseAuth();

onIonViewWillEnter(async () => {
    let userUid = getLocalStorageItem('uid');
    const userData = await getDocument('users/' + userUid);
    if (userData.data) {
        userStore.setUserData(userData);
        productsStore.setFirebaseRestaurantsReference('users/' + userUid + '/restaurants');
        userStore.setFirebaseRestaurantsReference('users/' + userUid + '/restaurants');
        // store.setFirebaseEmployeesReference('users/' + userUid + '/employees');
        await userStore.getUserRestaurants(userUid);
    } else {
        await setDocument('users/' + userUid);
    }
})

const addNewRestaurant = () => {
    router.push('add-instance')
}

const logOut = async () => {
    await signOut();
    deleteLocalStorageItem('uid')
    router.push({ name: 'auth' });
};

const handleRefresh = async (event: any) => {
    let userUid = getLocalStorageItem('uid');
    await userStore.getUserRestaurants(userUid);
    event.target.complete();
}

const editRestaurant = (id: string) => {
    console.log(id,)
    router.push({
        name: 'edit instance',
        params: {
            id: id
        }
    })
}
</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Bipper - Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" color="secondary">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)" :pull-factor="0.9" :pull-min="100"
                :pull-max="150">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <ion-header collapse="condense">
                <ion-toolbar color="secondary">
                    <ion-title size="large">Bipper.</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="flex w-full min-h-4/5 flex-col p-3 justify-start gap-5 relative">
                <div v-if="userStore.loading" class="w-full h-full flex items-center justify-center">
                    <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
                </div>
                <div v-else>
                    <div v-if="userStore.userRestaurants.length === 0" class="flex flex-col gap-20">
                        <div class="bg-white shadow-md rounded-lg overflow-hidden mx-5">
                            <div class="px-5 py-4">
                                <h2 class="text-xl font-semibold pb-2 text-center">Using Bipper is straightforward</h2>
                                <p class="text-gray-700 mb-2 pt-1">1. Add a restaurant you want to manage inventory for.
                                </p>
                                <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">2. Add products to the
                                    restaurant. </p>
                                <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">3. Assign employees to handle
                                    product management. </p>
                                <p class="text-gray-700 mb-2 border-t border-gray-300 pt-1">4. Bipper will handle the rest
                                    for you!</p>
                            </div>
                        </div>
                        <div>
                            <h2 class="text-2xl capitalize text-center">You Don't have any restaurants</h2>
                            <BButton class="my-6" @click="addNewRestaurant">
                                <template #title>Add New</template>
                            </BButton>
                        </div>
                    </div>
                    <div v-else class="flex flex-col gap-3 w-full justify-start">
                        <h2 class="text-3xl">My Restaurants</h2>
                        <div v-for="restaurant in userStore.userRestaurants" :key="restaurant.name"
                            @click="editRestaurant(restaurant.id)" class="flex justify-between items-center w-full border rounded-xl bg-white pr-5">
                            <ul class="p-5">
                                <li>
                                    <h2 class="text-2xl font-bold">{{ restaurant.name }}</h2>
                                </li>
                                <li>Location: <span class="font-bold">{{ restaurant.location }}</span></li>
                                <li>Employees: {{ restaurant.assigned_employees.length }}</li>
                                <li>Products: {{ restaurant.products.length }}</li>
                            </ul>
                            <ChevronRight/>
                        </div>
                        <div>
                            <BButton class="my-6" @click="addNewRestaurant">
                                <template #title>Add New</template>
                            </BButton>
                            <BButton class="my-6" @click="router.push({name: 'storage'})">
                                <template #title>Storage ( DEMO ) </template>
                            </BButton>
                        </div>
                    </div>
                    <BButton class="absolute bottom-[0] right-5 w-[50px] h-[20px] bg-red-600" @click="logOut">
                        <template #icon>
                            <LogOut class="min-w-[30px] text-red-600" />
                        </template>
                    </BButton>
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