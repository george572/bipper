<script setup lang='ts'>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonToast, IonSpinner } from '@ionic/vue';
import { Info } from 'lucide-vue-next';
import BButton from '@/components/base/B-Button.vue';
import { ref } from 'vue';
import { useUsersStore } from '@/pinia/userStore';
import { useFirebase } from '@/composables/useFirebase';
import router from '@/router';

const userStore = useUsersStore();
const { addDocument } = useFirebase();

const loading = ref(false);
const formData = ref({
    restaurantName: "",
    location: "",
});

const addNewRestaurant = async () => {
    loading.value = true;
    await addDocument('users/' + userStore.userData.id + '/restaurants', {
        name: formData.value.restaurantName,
        location: formData.value.location,
        assigned_employees: [],
        products: [
            // { barCode: "", createdAt: "", expiry: "", id: "", name: "", quantity: "", referenceName: "", supplier: "" }
        ],
    });
    formData.value.restaurantName = "";
    formData.value.location = "";
    loading.value = false;
    router.push('/dashboard')
};
</script>

<template>
    <ion-page>
        <ion-content :forceOverscroll="false" :fullscreen="true" color="secondary">
            <ion-header :translucent="true">
                <ion-toolbar>
                    <ion-title>Storage</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-header collapse="condense">
                <ion-toolbar color="secondary">
                    <ion-buttons slot="start">
                        <ion-back-button default-href="#" color="dark"></ion-back-button>
                    </ion-buttons>
                    <ion-title class="ion-text-center page-title">Add New Restaurant</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="flex w-full flex-col p-3 items-center justify-around gap-5 px-10">
                <p class="text-2xl">Specify Details</p>
                <div class="bg-white w-full shadow-md rounded-lg overflow-hidden p-5">
                    <input v-model="formData.restaurantName" type="text" placeholder="Name"
                        class="bg-white border py-3 px-3 lowercase w-full mb-3" autofocus>
                    <input v-model="formData.location" type="text" placeholder="Address"
                        class="bg-white border py-3 px-3 lowercase w-full mb-3" autofocus>
                </div>
                <BButton @click="addNewRestaurant"
                    :class="{ 'bg-gray-100 text-gray-300 shadow-none pointer-events-none': formData.restaurantName.length === 0 || formData.location.length === 0 }">
                    <template #icon v-if="loading">
                        <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
                    </template>
                    <template #title v-else>Save</template>
                </BButton>
            </div>
            <!-- <div class="px-10 pt-4 flex italic gap-1 items-start">
                <Info class="min-w-[20px]" />
                <p>You might want to create a new branch for the same restaurant. In that case, select the existing
                    restaurant and provide a different address. </p>
            </div> -->
        </ion-content>
    </ion-page>
</template>