<script setup lang='ts'>
import {ref} from "vue";
import { IonButton, IonBackButton, IonButtons, IonHead, IonList, IonTitle, IonContent, IonText, IonHeader,IonToolbar } from '@ionic/vue';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

const barcodeData = ref([]);
const isScanning = ref(null);
const startScan = async () => {
    requestPermissions();
    checkPermissions();
    isScanning.value = true;
  // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
  // However, this means that you have to hide all elements that should not be visible.
  // You can find an example in our demo repository.
  // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
  document.querySelector('body')?.classList.add('barcode-scanner-active');
    console.log('raari')
  // Add the `barcodeScanned` listener
  const listener = await BarcodeScanner.addListener(
    'barcodeScanned',
    async result => {
      barcodeData.value.push(result.barcode);
      stopScan();
    },
  );

  // Start the barcode scanner
  await BarcodeScanner.startScan();
};

const stopScan = async () => {
    isScanning.value = false;

  // Make all elements in the WebView visible again
  document.querySelector('body')?.classList.remove('barcode-scanner-active');

  // Remove all listeners
  await BarcodeScanner.removeAllListeners();

  // Stop the barcode scanner
  await BarcodeScanner.stopScan();
};

const scanSingleBarcode = async () => {
  return new Promise(async resolve => {
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        await listener.remove();
        document
          .querySelector('body')
          ?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan();
        resolve(result.barcode);
      },
    );

    await BarcodeScanner.startScan();
  });
};

const scan = async () => {
  const { barcodes } = await BarcodeScanner.scan({
    formats: [BarcodeFormat.QrCode],
    lensFacing: LensFacing.Back,
  });
  return barcodes;
};

const isSupported = async () => {
  const { supported } = await BarcodeScanner.isSupported();
  return supported;
};

const enableTorch = async () => {
  await BarcodeScanner.enableTorch();
};

const disableTorch = async () => {
  await BarcodeScanner.disableTorch();
};

const toggleTorch = async () => {
  await BarcodeScanner.toggleTorch();
};

const isTorchEnabled = async () => {
  const { enabled } = await BarcodeScanner.isTorchEnabled();
  return enabled;
};

const isTorchAvailable = async () => {
  const { available } = await BarcodeScanner.isTorchAvailable();
  return available;
};

const openSettings = async () => {
  await BarcodeScanner.openSettings();
};

const isGoogleBarcodeScannerModuleAvailable = async () => {
  const { available } =
    await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
  return available;
};

const installGoogleBarcodeScannerModule = async () => {
  await BarcodeScanner.installGoogleBarcodeScannerModule();
};

const checkPermissions = async () => {
  const { camera } = await BarcodeScanner.checkPermissions();
  console.log(camera, 'permitted')
  return camera;
};

const requestPermissions = async () => {
  const { camera } = await BarcodeScanner.requestPermissions();
  console.log(camera)
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
          <ion-title class="ion-text-center page-title">Storage Management</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-button @click="startScan" class="start-scan-btn" v-if="!isScanning">Start Scan</ion-button>
        <ion-button @click="stopScan" class="barcode-scanner-modal" v-else>Stop Scan</ion-button>

        
        <ion-list v-if="barcodeData.length > 0">
            <ion-list-header>
              <ion-label>Scanned Barcodes</ion-label>
            </ion-list-header>
            <ion-item v-for="barcode in barcodeData" :key="barcode">
              <ion-label>{{barcode.rawValue}}</ion-label>
            </ion-item>
            </ion-list>
      </ion-content>
</template>


<style>
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

.barcode-scanner-active {
  visibility: hidden;
}

.barcode-scanner-modal {
  visibility: visible;
}

.scanner-active {
    --background: transparent;
    --ion-background-color: transparent;
  }

  .start-scan-btn {
    margin: 50px 0;
  }
</style>   