<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonFooter, IonToolbar, IonCard, IonInput, IonCardTitle, IonItem, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const passCodeModel = ref("");

const checkPassCode = () => {
  // make request to server and check for the pass code
  // ignoring for now unless back-end is implemented
  console.log(passCodeModel);
  router.push({ name : "storage"});
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Bipper - Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light" >
      <ion-header collapse="condense">
        <ion-toolbar color="light">
          <ion-title size="large">Bipper.</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="login-input-wrapper">
        <ion-card-title class="ion-text-center">Enter Passcode</ion-card-title>
        <ion-card>
          <ion-item>
            <ion-input label="Passcode" type="password" v-model="passCodeModel" autofocus></ion-input>
          </ion-item>
        </ion-card>
      </div>

      <ion-item class="submit-btn-wrapper" color="light">
        <ion-button size="default" class="submit-btn" color="dark" @click="checkPassCode">Log In</ion-button>
      </ion-item>
    </ion-content>
    <ion-footer collapse="condense">
      <ion-toolbar class="ion-text-center">
        <p>Tip: Any Passcode Works for now</p>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>



<style scoped>
#container strong {
  font-size: 20px;
  line-height: 26px;
}



#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

.submit-btn {
  margin: 5px auto;
  display: block;
  width: 100%;
}

:host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-native, :host(.ion-color:not(.item-fill-solid):not(.item-fill-outline)) .item-inner {
  border: none !important;
}

.login-input-wrapper {
  margin-top: 50%;
  margin: 50% auto 0;
}
</style>
