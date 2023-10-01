<script setup lang='ts'>
import { IonButton, IonBackButton, IonButtons, IonTitle, IonContent, IonText, IonListHeader, IonHeader,IonToolbar, IonItem, IonLabel, IonList} from '@ionic/vue';
import { useScanner } from "@/composables/useScanner";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";

import { ref } from 'vue';
// const { startScan, stopScan, isScanning, barcodeData } = useScanner();
const barcodeData = ref<string[]>([]);
const isScanning = ref<null | boolean>(null);
  const startScan = async () => {
    checkPermissions();
    isScanning.value = true;
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector("body")?.classList.add("barcode-scanner-active");
    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        barcodeData.value.push(result.barcode.displayValue);
        stopScan();
      }
    );

    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };
  const stopScan = async () => {
    isScanning.value = false;

    // Make all elements in the WebView visible again
    document.querySelector("body")?.classList.remove("barcode-scanner-active");

    // Remove all listeners
    await BarcodeScanner.removeAllListeners();

    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };

  const checkPermissions = async () => {
    const { camera } = await BarcodeScanner.checkPermissions();
    console.log(camera, "permitted");
    return camera;
  };
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
          <ion-title class="ion-text-center page-title">Take Product From Storage</ion-title>
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
                                If you know for certain that the product is in stock, try re-scanning 
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

body.barcode-scanner-active {
  visibility: hidden;
  --background: transparent;
  --ion-background-color: transparent;
}

.barcode-scanner-modal {
  visibility: visible;
}

@media (prefers-color-scheme: dark) {
  .barcode-scanner-modal {
    --background: transparent;
    --ion-background-color: transparent;
  }
}
</style>   