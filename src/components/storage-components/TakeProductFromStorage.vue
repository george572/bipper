<script setup lang='ts'>
import { IonText } from '@ionic/vue';
</script>

<template>
    <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Storage</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-header collapse="condense">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#" color="primary"></ion-back-button>
              </ion-buttons>
          <ion-title class="ion-text-center page-title">Storage Management</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-text class="ion-padding">scan happens here</ion-text>
      </ion-content>
</template>