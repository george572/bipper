<script setup lang="ts">
import {
  IonButton,
  IonBackButton,
  IonButtons,
  IonActionSheet,
  IonTitle,
  IonContent,
  IonText,
  IonHeader,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/vue";
import { useScanner } from "@/composables/useScanner";
import { useCounterStore } from "@/pinia";
import { ref } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Ocr, TextDetections } from "@capacitor-community/image-to-text";

const { startScan, stopScan, isScanning, barcodeData } = useScanner();
const store = useCounterStore();

const currentProductData = ref({
  name: "",
  quantity: 0,
  expiry: "",
  supplier: "",
  referenceName: "",
});

const saveProducts = () => {
  store.addDataInDb(currentProductData.value);
};

const detectedText = ref<string[]>([]);
const textRecognition = async (action: string) => {
  let source = action === "upload" ? CameraSource.Photos : CameraSource.Camera;
  detectedText.value = [];
  const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: source, // This line specifies that we want to choose an existing photo from the gallery
  });

  const data: TextDetections = await Ocr.detectText({
    filename: photo.path ?? "",
  });

  for (let detection of data.textDetections) {
    detectedText.value.push(detection.text);
    console.log(detection.text);
  }
};

const actionSheetButtons = [
  {
    text: "Camera",
    data: {
      handler: () => textRecognition('camera'),
    },
  },
  {
    text: "Gallery",
    data: {
      handler: () => textRecognition('upload'),
    },
  },
  {
    text: "Cancel",
    role: "cancel",
    data: {
      action: "cancel",
    },
  },
];
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
      <ion-title class="ion-text-center page-title">Add New Porudct</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div v-if="!isScanning">
      <ion-list v-if="barcodeData.length === 0">
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
            Make sure there is only one barcode visible in the camera to avoid
            unnecessarily confusing the scanner
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap">
            Scanner may occasionally get the barcode value incorrectly. It's
            recommended to check the numbers time-to-time on the actual barcode
            and the scanned barcode results
          </ion-label>
        </ion-item>
        <ion-button @click="startScan" class="start-scan-btn" color="dark"
          >Start Scan</ion-button
        >
      </ion-list>
    </div>
    <ion-button
      @click="stopScan"
      class="barcode-scanner-modal"
      color="warning"
      v-else
      >Stop Scan</ion-button
    >
    <ion-list v-if="barcodeData.length > 0">
      <ion-list-header>
        <ion-label>Product Information</ion-label>
      </ion-list-header>
      <ion-item>
        <ion-label>Barcode : {{ barcodeData }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-input
          type="text"
          v-model="currentProductData.name"
          label="Name:"
          placeholder="ex : corn pack"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          type="text"
          v-model="currentProductData.quantity"
          label="Quantity:"
          placeholder="ex: 12"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-text>Expiry Date:</ion-text>
        <ion-button id="open-action-sheet" class="expiry-date-btn">SCAN</ion-button>
        <ion-action-sheet
        trigger="open-action-sheet"
        header="Decide How do you want to perform a scan"
        :buttons="actionSheetButtons"
      ></ion-action-sheet>
      </ion-item>
      <ion-item>
        <ion-input
          type="text"
          v-model="currentProductData.supplier"
          label="Supplier (Optional):"
          placeholder="ex: Corn SUP"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          type="text"
          v-model="currentProductData.referenceName"
          label="Reference Name(Optional):"
          placeholder="ex: my corn"
        ></ion-input>
      </ion-item>
      <ion-button color="dark" class="start-scan-btn" @click="saveProducts">
        Save
      </ion-button>
      <ion-button @click="startScan" class="start-scan-btn" color="dark"
        >New Scan</ion-button
      >
    </ion-list>
  </ion-content>
  <div v-if="barcodeData.length < 1">
    <ion-list>
      <ion-item> Recognize text </ion-item>
      <ion-button color="dark" class="start-scan-btn" @click="textRecognition"
        >TAKE IMAGE</ion-button
      >
      <ion-button
        color="dark"
        class="start-scan-btn"
        @click="textRecognition('upload')"
        >UPLOAD IMAGE</ion-button
      >
      <ion-item v-if="detectedText.length > 0">
        <ion-text class="ion-text-wrap ion-padding-bottom">
          {{ detectedText.join(" ") }}
        </ion-text>
      </ion-item>
    </ion-list>
  </div>
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

.expiry-date-btn {
  margin-left: 15px;
}
</style>
