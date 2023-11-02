<script setup lang='ts'>
import { reactive, computed, onMounted } from 'vue';
import { useManageStorageProducts } from "@/pinia";
import {
  IonSpinner,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/vue';
import { useHaptics } from '@/composables/useHaptics';
import BButton from '../base/B-Button.vue';
import router from '@/router';
const { hapticsImpactMedium } = useHaptics();

const props = defineProps({
  barcodeData: {
    type: String,
    required: true
  },
  productData: {
    type: Object as () => ProductData | undefined,
    required: false,
    default: undefined
  },
  disableEditing: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['startScan']);
const store = useManageStorageProducts();

let currentProductData = reactive<ProductData>({
  name: "",
  barCode: null,
  quantity: 0,
  expiry: "",
  supplier: "",
  referenceName: "",
  createdAt: new Date()
});

onMounted(() => {
  if (props.productData && props.productData.name) {
    let product = props.productData;
    product.quantity = 0;
    product.expiry = "";
    Object.assign(currentProductData, props.productData);
  }
})
const setExpiryDate = (date: any) => {
  currentProductData.expiry = date.detail.value;
}

const formInvalid = computed(() => {
  if (currentProductData.quantity && currentProductData.expiry) {
    if (currentProductData.name.length < 1 && currentProductData.quantity < 1 && currentProductData.expiry.length < 1) {
      return false
    }
  } else {
    return true;
  }
});

const saveProducts = async () => {
  if (props.productData && props.productData.name) {
    await store.updateProduct(currentProductData);
    router.push({ name: 'storage' });
    return;
  }
  hapticsImpactMedium();
  currentProductData.barCode = Number(props.barcodeData);
  await store.addDataInDb(currentProductData);
  Object.assign(currentProductData, {
    name: "",
    barCode: null,
    quantity: undefined,
    expiry: undefined,
    supplier: "",
    referenceName: "",
    createdAt: null
  });
  router.push({ name: 'storage' });
};

</script>

<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden mx-5 mt-10">
    <div class="p-4">
      <p v-if="props.productData" class=" text-yellow-400 text-center py-2">The product you have scanned already exists in your storage, but it's quantity is zero</p>
      <h2 class="text-xl font-semibold pb-2 border-b">Poduct Information</h2>
      <p class="text-gray-700 py-3 border-b">Scanned Barcode : <span class="font-bold text-gray-400">{{ barcodeData
      }}</span></p>
      <div class="text-gray-700 border-b">
        <label>Name (<span class="font-bold">*</span>) :</label>
        <input :disabled="props.disableEditing" class="py-2 px-3 bg-white" type="text" v-model="currentProductData.name" label="Name:"
          placeholder="Write Product Name" />
      </div>
      <div class="text-gray-700 border-b">
        <label>Quantity (<span class="font-bold">*</span>) :</label>
        <input class="py-2 px-3 bg-white" type="tel" v-model="currentProductData.quantity" label="Quantity:"
          placeholder="Write Product Quantity" />
      </div>
      <div class="text-gray-700 border-b flex items-center gap-5 py-2">
        <label>Expiry (<span class="font-bold">*</span>) :</label>
        <div>
          <ion-datetime-button datetime="datetime">Open Calendar</ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" preferWheel presentation="date" max="2030"
              @ionChange="date => setExpiryDate(date)"></ion-datetime>
          </ion-modal>
        </div>
      </div>
      <div class="text-gray-700 border-b">
        <label>Supplier:</label>
        <input :disabled="props.disableEditing" class="py-2 px-3 bg-white" type="text" v-model="currentProductData.supplier"
          placeholder="Write Product Supplier" />
      </div>
      <div class="text-gray-700 flex items-center justify-start">
        <label class="w-[210px]">Reference Name:</label>
        <input :disabled="props.disableEditing" class="w-full py-2 px-3 bg-white" type="text" v-model="currentProductData.referenceName"
          placeholder="Write Reference name" />
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-5 mt-5">
    <BButton color="dark" :class="{ 'bg-gray-300 text-gray-400 shadow-none pointer-events-none': formInvalid }"
      @click="saveProducts">
      <template #title v-if="!store.loading">Save</template>
      <ion-spinner v-if="store.loading" class="ion-loading-spin" name="lines-sharp" color="medium"></ion-spinner>
    </BButton>
    <BButton @click="() => emit('startScan')" class="disabled">
      <template #title>New Scan</template>
    </BButton>
  </div>
</template>

<style>
.expiry-title {
  margin-right: 10px;
  ;
}
</style>