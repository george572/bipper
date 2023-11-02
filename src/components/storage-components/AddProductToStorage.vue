<script setup lang="ts">
import {
  IonButton,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonToast,
  IonPage,
  onIonViewDidLeave,
  onIonViewDidEnter
} from "@ionic/vue";
import { onMounted, ref, watch } from "vue";
import { useScanner } from "@/composables/useScanner";
import ScanResults from "./ScanResults.vue";
import { useManageStorageProducts } from "@/pinia/productsStore";
import BButton from "../base/B-Button.vue";
import { useRouter } from "vue-router";
const { startScan, stopScan, isScanning, barcodeData, toggleTorch } = useScanner();
const store = useManageStorageProducts();
const currentStorageProducts = ref<ProductData[]>([]);
const productExists = ref<null | boolean>(true);
const router = useRouter();
const currentProduct = ref<ProductData>();
const disableInfoEditing = ref(false);


onIonViewDidEnter(async () => {
  await store.getCollectionFromDb();
  currentStorageProducts.value = store.collectionData;
});

onIonViewDidLeave(() => {
  barcodeData.value = "";
});

const checkIfBarcodeExists = (barcode: string) => {
  const product = currentStorageProducts.value.find((product) => product.barCode === Number(barcode));
  if (product) {
    if (product && product.quantity && Number(product.quantity) > 0) {
      router.push(`product-page/${product.id}`);
    } else {
      disableInfoEditing.value = true;
      currentProduct.value = product;
    }
  }
};

watch(barcodeData, (newVal) => {
  checkIfBarcodeExists(newVal);
});
</script>

<template>
  <ion-page>
    <ion-content :forceOverscroll="false" color="secondary">
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
          <ion-title class="ion-text-center page-title">Add New Porudct</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="!isScanning" class="h-[84vh]">
        <div v-if="barcodeData.length === 0" class="h-full flex flex-col items-center justify-around">
          <div class="bg-white shadow-md rounded-lg overflow-hidden mx-5">
            <div class="px-6 py-4">
              <h2 class="text-xl font-semibold pb-2">Before you start scanning...</h2>
              <p class="text-gray-700 mb-4 pt-3">Make sure the barcode is clearly visible and in correct angle</p>
              <p class="text-gray-700 mb-4 border-t border-gray-300 pt-3">Make sure there is only one barcode visible in
                the camera to avoid unnecessarily confusing the scanner</p>
              <p class="text-gray-700 mb-4 border-t border-gray-300 pt-3">Scanner may occasionally get the barcode value
                incorrectly. It's recommended to check the numbers time-to-time on the actual barcode and the scanned
                barcode results</p>
            </div>
          </div>
          <BButton @click="startScan">
            <template #title>Start Scan</template>
          </BButton>
        </div>
        <scan-results v-else :disable-editing="disableInfoEditing" :product-data="(currentProduct as ProductData)" :barcode-data="barcodeData" @start-scan="startScan" />
      </div>
      <div v-else class="camera-controls-wrapper">
        <ion-button @click="stopScan" class="barcode-scanner-modal" color="warning">Stop Scan</ion-button>
        <ion-button @click="toggleTorch" class="flashlight" color="warning">Flash</ion-button>
      </div>
      <ion-toast :is-open="store.toastBody.show" @didDismiss="store.showToast('close')" :color="store.toastBody.type"
        :message="store.toastBody.message" position="bottom" :duration="3000"></ion-toast>
    </ion-content>
  </ion-page>
</template>

<style>
.camera-controls-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
}

.barcode-scanner-active {
  visibility: hidden;
}

.barcode-scanner-modal {
  visibility: visible;
  position: absolute;
  bottom: 20px;
  right: 10px;
}

.flashlight {
  visibility: visible;
  position: absolute;
  bottom: 20px;
  left: 10px;
}

.expiry-date-btn {
  margin-left: 15px;
}

.ion-loading-spin {
  height: 20px;
}
</style>
