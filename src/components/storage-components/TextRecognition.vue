<script setup lang='ts'>
import { ref } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Ocr, TextDetections } from "@capacitor-community/image-to-text";

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
  }
};
</script>

<template>
  <!-- <div v-if="barcodeData.length < 1">
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
  </div> -->
</template>