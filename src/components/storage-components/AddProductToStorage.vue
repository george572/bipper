<script setup lang='ts'>
import { IonButton, IonBackButton, IonButtons, IonTitle, IonContent, IonText, IonHeader,IonToolbar, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonList} from '@ionic/vue';
import { useScanner } from "@/composables/useScanner";

const { startScan, stopScan, isScanning, barcodeData } = useScanner();

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
          <ion-title class="ion-text-center page-title">Add New Product</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div v-if="!isScanning">
            <ion-list>
                <ion-list-header>
                    <ion-label>Before you start scanning...</ion-label>
                </ion-list-header>
                        <ion-item>
                            <ion-label class="ion-text-wrap">
                                Make sure the barcode is clearly visible and in correct angle 
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label class="ion-text-wrap">
                                Make sure there is only one barcode visible in the camera to avoid unnecessarily confusing the scanner
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label class="ion-text-wrap">
                                Scanner may occasionally get the barcode value incorrectly.
                                It's recommended to check the numbers time-to-time on the actual barcode and the scanned barcode results
                            </ion-label>
                        </ion-item>

            </ion-list>
            <ion-button @click="startScan" class="start-scan-btn" color="dark">Start Scan</ion-button>
        </div>
        <ion-button @click="stopScan" class="barcode-scanner-modal" color="warning" v-else>Stop Scan</ion-button>
        <ion-list v-if="barcodeData.length > 0">
            <ion-list-header>
              <ion-label>Scanned Barcodes</ion-label>
            </ion-list-header>
            <ion-item v-for="barcode in barcodeData" :key="barcode">
              <ion-label>{{barcode}}</ion-label>
            </ion-item>
            </ion-list>
      </ion-content>
</template>


<style>

.barcode-scanner-active {
  visibility: hidden;
}

.barcode-scanner-modal {
  visibility: visible;
  position: absolute;
  bottom: 20px;
  right: 10px;
}


.start-scan-btn {
    margin: 0 auto;
    width: 100%;
    padding: 15px;
}
</style>   