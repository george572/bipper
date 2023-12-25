<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/pinia/auth';
import { ArrowLeft } from 'lucide-vue-next';
import BButton from '../base/B-Button.vue';
import { IonToast, IonSpinner } from '@ionic/vue';
import router from '@/router';




defineEmits(["hideManagerLogin", 'userLogin']);
const store = useAuthStore();

const userAuthData = ref<UserAuthData>({
    email: "",
    password: ""
});

const signInUser = async () => {
    try {
        await store.signIn(userAuthData.value.email, userAuthData.value.password);
        router.push({ name: "storage" });
        console.log('hae')
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="flex h-full w-full flex-col justify-start gap-1 items-start px-10">
        <div @click="$emit('hideManagerLogin')"
            class="w-[50px] h-[50px] rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft />
        </div>
        <h2 class="text-xl text-center w-full pb-3">Login</h2>
        <input type="text" placeholder="email" class="bg-white py-3 px-3 lowercase w-full mb-3" v-model="userAuthData.email"
            autofocus>
        <input type="password" placeholder="password" class="bg-white py-3 px-3 w-full" v-model="userAuthData.password">
        <BButton @click="signInUser" class="mt-4">
            <template #title v-if="!store.loading">Log In</template>
            <template #icon v-if="store.loading">
                <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
            </template>
        </BButton>
        <ion-toast :is-open="store.toastBody.show" @didDismiss="store.showToast('close')" :color="store.toastBody.type"
            :message="store.toastBody.message" position="bottom" :duration="3000"></ion-toast>
    </div>
</template>