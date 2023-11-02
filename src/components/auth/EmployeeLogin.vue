<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/pinia/auth';
import { ArrowLeft } from 'lucide-vue-next';
import { useLocalStorage } from '@/composables/useLocalStorage';
const store = useAuthStore();

onMounted(() => {
});

defineEmits(["hideEmployeeLogin", 'userLogin']);
const userAuthData = ref({
    passcode: "",
});

const signInUser = async () => {
//   await store.signIn(userAuthData.value.email, userAuthData.value.password);
}
</script>

<template>
    <div class="flex h-full w-full flex-col justify-center gap-5 items-start px-10">
        <div @click="$emit('hideEmployeeLogin')" class="min-w-[50px] min-h-[50px] rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft />
        </div>
        <h2 class="w-full text-center text-lg">Passcode</h2>
        <p class="text-xs w-full text-center text-gray-500">Ask your manager for the passcode if you forget it</p>
        <input type="tel" autofocus placeholder="Passcode" class="bg-white py-3 px-3 lowercase w-full" v-model="userAuthData.passcode">
        <BButton @click="$emit('userLogin', userAuthData)">
            <template #title v-if="!store.loading">Log In</template>
            <template #icon v-if="store.loading">
                <ion-spinner class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
            </template>
        </BButton>
        <ion-toast :is-open="store.toastBody.show" @didDismiss="store.showToast('close')" :color="store.toastBody.type"
            :message="store.toastBody.message" position="bottom" :duration="3000"></ion-toast>
    </div>
</template>@/composables/useLocalStorage