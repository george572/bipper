<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonFooter, IonToolbar, IonToast, IonSpinner } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BButton from '@/components/base/B-Button.vue';
import { useAuthStore } from '@/pinia/auth';
import ManagerLogin from '@/components/auth/ManagerLogin.vue';
import EmployeeLogin from '@/components/auth/EmployeeLogin.vue';

const store = useAuthStore();
const router = useRouter();
const passCodeModel = ref("");
const showManagerLogin = ref(false);
const showEmployeeLogin = ref(false);

const userAuthData = ref<UserAuthData>({
  email: "",
  password: ""
});

const signUpUser = async () => {
  await store.signUp(userAuthData.value.email, userAuthData.value.password);
}

const checkPassCode = () => {
  // make request to server and check for the pass code
  // ignoring for now unless back-end is implemented
  router.push({ name: "dashboard" });
}
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
      <div class="flex w-full h-4/5 flex-col justify-center gap-10 items-center">
        <div v-if="!showManagerLogin && !showEmployeeLogin" class="flex gap-3 flex-col items-center">
          <h1 class="text-2xl">I am</h1>
          <BButton @click="showManagerLogin = true" class="w-full">
            <template #title>Manager</template>
          </BButton>
          <BButton @click="showEmployeeLogin = true" class="w-full">
            <template #title>Employee</template>
          </BButton>
        </div>
        <ManagerLogin v-if="showManagerLogin" @hide-manager-login="showManagerLogin = false"/>
        <EmployeeLogin v-if="showEmployeeLogin" @hide-employee-login="showEmployeeLogin = false" />
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
