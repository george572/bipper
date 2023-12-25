<script setup lang='ts'>
import { IonContent, IonHeader, IonPage, IonTitle, onIonViewWillEnter, IonToolbar, IonButtons, IonBackButton, IonSelect, IonSelectOption, IonToast, IonSpinner } from '@ionic/vue';
import BButton from '@/components/base/B-Button.vue';
import { ref } from 'vue';
import { useUsersStore } from '@/pinia/userStore';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/pinia/auth';


const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const userStore = useUsersStore();
const loading = ref(false);
const currentRestaurant = ref();
const formData = ref({
    name: "",
    email: "",
    password: "",
});

// userStore.firebaseRestaurantsReference
// const updateRestaurant = async (reference: string, restaurantData: ProductData)

onIonViewWillEnter(() => {
    currentRestaurant.value = userStore.getRestaurantById(route.params.restaurantid as string)[0];
});

const addNewEmployee = async () => {
    loading.value = true;
    const resp = await authStore.signUp(formData.value.email, formData.value.password);
    currentRestaurant.value.assigned_employees.push({ name: formData.value.name, email: formData.value.email });
    await userStore.updateRestaurant(userStore.firebaseRestaurantsReference + '/' + route.params.restaurantid, currentRestaurant.value);
    formData.value.name = "";
    formData.value.email = "";
    formData.value.password = "";
    loading.value = false;
    router.go(-1);
}
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
                    <ion-title class="ion-text-center page-title">Add New Employee</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="flex w-full flex-col p-3 items-center justify-around gap-5 px-10">
                <p class="text-2xl">Provide Employee Details</p>
                <div class="bg-white w-full shadow-md rounded-lg overflow-hidden p-5">
                    <input v-model="formData.name" type="text" placeholder="Name"
                        class="bg-white border py-3 px-3 lowercase w-full mb-3" autofocus>
                    <input v-model="formData.email" type="text" placeholder="Email"
                        class="bg-white border py-3 px-3 lowercase w-full mb-3" autofocus>
                    <input v-model="formData.password" type="text" placeholder="Password ( Min 6 characters )"
                        class="bg-white border py-3 px-3 lowercase w-full mb-3" autofocus>
                </div>
                <BButton @click="addNewEmployee"
                    :class="{ 'bg-gray-100 text-gray-300 shadow-none pointer-events-none': formData.email.length === 0 || formData.name.length === 0 || formData.password.length === 0 }">
                    <template #icon v-if="loading">
                        <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
                    </template>
                    <template #title v-else>Save</template>
                </BButton>
            </div>
            <ion-toast :is-open="authStore.toastBody.show" @didDismiss="authStore.showToast('close')"
                :color="authStore.toastBody.type" :message="authStore.toastBody.message" position="bottom"
                :duration="3000"></ion-toast>
            <ion-toast :is-open="userStore.toastBody.show" @didDismiss="userStore.showToast('close')"
                :color="userStore.toastBody.type" :message="userStore.toastBody.message" position="bottom"
                :duration="3000"></ion-toast>
        </ion-content>
    </ion-page>
</template>