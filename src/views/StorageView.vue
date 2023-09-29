<script setup lang='ts'>
import { IonBackButton, IonButtons, IonIcon, IonText, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton  } from '@ionic/vue';
import { useRouter } from 'vue-router';
import {chevronForward} from 'ionicons/icons';



const router = useRouter();

const takeProduct = (action: string) => {
    router.push({name: 'manage-products', query: { action: action }})
}
</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
          <ion-toolbar>
            <ion-title>Storage</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" >
          <ion-header collapse="condense">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="#" color="primary"></ion-back-button>
                  </ion-buttons>
              <ion-title class="ion-text-center page-title">Storage Management</ion-title>
            </ion-toolbar>
          </ion-header>
            <ion-card-header>
                <ion-card-title class="ion-margin-left">
                    Action
                </ion-card-title>
            </ion-card-header>
            <ion-card-content class="storage-action-btn-wrapper"
            >
                <ion-button color="dark" @click="takeProduct('take')">
                    Take Product
                    <ion-icon slot="end" :icon="chevronForward" color="light"></ion-icon>
                </ion-button>
                <ion-text color="medium" class="button-description">
                    If you want to take the product from the storage to the kitchen
                </ion-text>
                <ion-button size="default"  @click="takeProduct('add')" color="dark" class="submit-btn ion-margin-top">
                    Add Product
                    <ion-icon slot="end" :icon="chevronForward" color="light"></ion-icon>
                </ion-button>
                <ion-text color="medium" class="button-description">
                    If you want to add new product in the storage, or re-stock already present one 
                </ion-text>
                <ion-button size="default"  color="dark" class="submit-btn ion-margin-top">
                    Quick search
                    <ion-icon slot="end" :icon="chevronForward" color="light"></ion-icon>
                </ion-button>
                <ion-text color="medium" class="button-description">
                    If you've set the reference name for the product while adding it in the storage, 
                    you can quickly search the information about it using quick search 
                </ion-text>
            </ion-card-content
            >
        </ion-content>
    </ion-page>
</template>

<style scoped>

.action-btn-wrapper {
    margin: 20px 0;
}

.ion-card-title {
    font-size: 20px;
}
.storage-action-btn-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 18px 20px;
}

.button-description {
    padding: 3px 8px 5px;
}

.divider {
    width: 100%;
    margin: 10px auto;
    height: 0.5px;
    background-color: rgba(0,0,0,0.5);

}
</style>