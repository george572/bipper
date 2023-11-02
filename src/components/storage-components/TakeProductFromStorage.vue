<script setup lang='ts'>
import { IonButton, IonPage, onIonViewWillEnter, IonCardHeader, IonIcon, IonButtons, IonTitle, IonSpinner, IonContent, IonText, IonListHeader, IonHeader,IonToolbar, IonItem, IonLabel, IonList} from '@ionic/vue';
import { useScanner } from "@/composables/useScanner";
import { ref, onMounted } from 'vue';
import { useManageStorageProducts } from "@/pinia/productsStore";
import { useRouter } from 'vue-router';
import { chevronForward, chevronBack } from 'ionicons/icons';
import { useHaptics } from '@/composables/useHaptics';
import BButton from '../base/B-Button.vue';

const { hapticsImpactLight } = useHaptics();
const store = useManageStorageProducts();
const router = useRouter();
const { startScan, stopScan, isScanning, toggleTorch } = useScanner();
const currentStorageProducts = ref<ProductData[]>([]);

onIonViewWillEnter( async () => {
  await store.getCollectionFromDb();
  currentStorageProducts.value = store.collectionData;
  console.log(currentStorageProducts.value, 'current data')
});

const goToAddProductPage = () => {
  router.push({name: 'add product'})
}

const handleProductClick = (product: any) => {
  hapticsImpactLight();
  router.push(`product-page/${product.id}`)
}

</script>

<template>
<ion-page>
  <ion-content :forceOverscroll="false">
        <ion-header :translucent="true">
            <ion-toolbar>
              <ion-title>Storage</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-header collapse="condense">
            <ion-toolbar>
                <ion-buttons slot="start">
                  <button @click="router.push('/storage')" color="dark" class="flex items-center">
                    <ion-icon slot="end" :icon="chevronBack" color="medium"></ion-icon>
                    <span>Back</span>
                </button>
                  </ion-buttons>
              <ion-title class="ion-text-center page-title">Take Product From Storage</ion-title>
            </ion-toolbar>
          </ion-header>
        <!-- RECENT ITEMS -->
        <div v-if="store.loading" class="loading-products">
          <ion-text>
            Loading Products From Storage
          </ion-text>
          <ion-spinner class="ion-loading-spin" name="lines-sharp" color="secondary"></ion-spinner>
        </div>
        <div v-else class="main-p">
          <div class="bg-white shadow-md rounded-lg overflow-hidden mx-2 mt-5" v-if="currentStorageProducts && currentStorageProducts.length > 0">
            <div class="px-2 py-4">
            <ion-list >
              <ion-list-header>
                <ion-label>Recent </ion-label>
              </ion-list-header>
              <ion-item>
                <ion-label class="bold-text text-2xl">Name</ion-label>
                <ion-label class="bold-text">Quantity</ion-label>
              </ion-item>
              <div class="products-list">
                <ion-item class="product-item" v-for="(product, index) in currentStorageProducts" :key="product.name" @click="handleProductClick(product)">
                  <ion-label>{{product.name}}</ion-label>
                  <ion-label class="quantity-text">{{product.quantity}}</ion-label>
                  <ion-icon slot="end" :icon="chevronForward" color="medium"></ion-icon>
                </ion-item>
              </div>
            </ion-list>
          </div>
        </div>
          <div v-if="!isScanning && currentStorageProducts && currentStorageProducts.length > 0" class="ion-margin-top rame">
            <ion-text class="ion-text-wrap custom-label" color="medium">Scan the product if you can't find it in the recent products list</ion-text>
            <BButton @click="startScan" class="start-scan-btn button-19" style="margin-top: 10px;" color="secondary">
              <template #title>Start Scan</template>
            </BButton>
        </div>
        <div v-else class="my-20">
          <ion-card-header class="ion-text-center">
            <BButton @click="goToAddProductPage" class="start-scan-btn" color="secondary">
              <template #title>Add Product</template>
            </BButton>
            <p class="py-2">You Have No Products</p>
          </ion-card-header>
        </div>
        <ion-button @click="stopScan" class="barcode-scanner-modal" color="warning" v-if="isScanning">Stop Scan</ion-button>
        <ion-button @click="toggleTorch" class="flashlight" color="warning" v-if="isScanning">Flash</ion-button>
        </div>
      </ion-content>
      </ion-page>
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
  width: 80%;
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

.loading-products {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.ion-loading-spin {
  margin-top: 10px;
}

.bold-text {
  font-weight: bold;
}

.products-list {
  max-height: 300px;
  overflow: scroll;
}
.flashlight {
  visibility: visible;
  position: absolute;
  bottom: 20px;
  left: 10px;
}

.quantity-text {
  padding-left: 29px;
}

.main-p {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  height: 82vh;
}
.rame {
  padding: 0 20px;
}
</style>   