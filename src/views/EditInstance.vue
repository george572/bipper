<script setup lang='ts'>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonToast, IonSpinner } from '@ionic/vue';
import BButton from '@/components/base/B-Button.vue';
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/pinia/userStore';
import { useFirebase } from '@/composables/useFirebase';
import { useRoute, useRouter } from 'vue-router';
import { Trash2 } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();
const restaurant = ref();

onMounted(() => {
    restaurant.value = userStore.getRestaurantById(route.params.id as string)[0];
});

const deleteRestaurant = async () => {
    await userStore.deleteRestaurant('users/' + userStore.userData.id + '/restaurants/' + restaurant.value.id);
    router.go(-1);
}

const GoToaddEmployees = () => {
    router.push({
        name: 'add employees',
        params: {
            restaurantid: route.params.id
        }
    })
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
                    <ion-title class="ion-text-center page-title">Edit Restaurant</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="flex w-full flex-col p-3 justify-around gap-5 px-3">
                <p class="text-2xl">Edit Restaurant</p>
                <div v-if="restaurant">
                    <ul class="w-full border rounded-xl bg-white p-5">
                        <li> Name: <span class="font-bold">{{ restaurant.name }}</span></li>
                        <li>Location: <span class="font-bold">{{ restaurant.location }}</span></li>
                        <li>Employees:
                            <span class="font-bold" v-for="emp in restaurant.assigned_employees" :key="emp.email">
                                {{ emp.name }},
                            </span>
                        </li>
                        <li>Products: {{ restaurant.products.length }}</li>
                    </ul>
                    <BButton @click="GoToaddEmployees" class="mt-5">
                        <template #title>Add Employees</template>
                    </BButton>
                    <!-- <BButton @click="deleteRestaurant" class=" mt-10 bg-red-500 text-black">
                        <template #title>Delete</template>
                        <template #icon v-if="!userStore.loading">
                            <Trash2 />
                        </template>
                        <template #icon v-else>
                            <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
                        </template>
                    </BButton> -->
                </div>
            </div>
            <ion-toast :is-open="userStore.toastBody.show" @didDismiss="userStore.showToast('close')"
                :color="userStore.toastBody.type" :message="userStore.toastBody.message" position="bottom"
                :duration="3000"></ion-toast>
        </ion-content>
    </ion-page>
</template>