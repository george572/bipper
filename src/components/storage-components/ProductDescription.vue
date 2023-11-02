<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';
import BButton from '../base/B-Button.vue';
import {
    IonText,
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonPage,
    IonTitle,
    IonItem,
    IonContent,
    IonList,
    IonSpinner,
    IonListHeader,
    IonButton,
    IonLabel,
    IonInput,
    IonToast,
    onIonViewWillEnter
} from '@ionic/vue';
import { useHaptics } from '@/composables/useHaptics';
const { hapticsImpactMedium, hapticsImpactLight } = useHaptics();

import { useRoute } from 'vue-router';
import { useManageStorageProducts } from '@/pinia';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const route = useRoute();
const router = useRouter();
const product = ref<ProductData>();
const store = useManageStorageProducts();
const productAmountToTake = ref(1);

onIonViewWillEnter(() => {
    product.value = store.getProductById(route.params.id);
})

const expiryDateStatus = (date: string) => {
    if (dayjs().isAfter(dayjs(date))) {
        return 'Expired'
    }
    if (dayjs().isSame(dayjs(date))) {
        return 'Expires Today'
    } else {
        return dayjs().to(dayjs(date))
    }
}

const calculateExpiryDateColor = (date: string) => {
    const today = dayjs();
    const expiry = dayjs(date);
    const daysUntilExpiry = expiry.diff(today, 'day');
    if (daysUntilExpiry <= 0) {
        return 'danger';
    } else if (daysUntilExpiry <= 7) {
        return 'warning';
    } else {
        return 'success';
    }
}

const handleAmountChange = (action: string) => {
    hapticsImpactLight();
    action === 'increase' ? productAmountToTake.value++ : productAmountToTake.value--;
}


const takeOutItem = () => {
    hapticsImpactMedium();
    if (product.value && product.value?.quantity) {
        product.value.quantity -= productAmountToTake.value;
    }
    store.takeOutProduct(product.value as ProductData);
    router.push({ name: 'take product' })
}
</script>

<template>
    <ion-page>
        <ion-content :forceOverscroll="false">
            <ion-header :translucent="true">
                <ion-toolbar>
                    <ion-title>Take Out</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="#" color="dark"></ion-back-button>
                    </ion-buttons>
                    <ion-title class="ion-text-center page-title">Take Out</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-item>
                <ion-text class="ion-text-center" style="width:100%"
                    v-if="product && product.quantity && product.quantity > 0"> You are taking out "{{ product?.name }}"
                </ion-text>
                <ion-text class="ion-text-center" style="width:100%" v-else> There is no more "{{ product?.name }}" in
                    storage </ion-text>
            </ion-item>
            <ion-list>
                <ion-item> Barcode : {{ product?.barCode }} </ion-item>
                <ion-item> Name : {{ product?.name }} </ion-item>
                <ion-item> Storage Quantity : {{ product?.quantity }} </ion-item>
                <ion-item> Expiry Date : {{ dayjs(product?.expiry as string).format('MMM-D-YYYY') }} <ion-text
                        class="expiry-date" :color="calculateExpiryDateColor(product?.expiry as string)"> ( {{
                            expiryDateStatus(product?.expiry as string) }} ) </ion-text>
                </ion-item>
                <ion-item> Reference Name : {{ product && product.referenceName && product.referenceName.length > 0 ?
                    product?.referenceName : 'Not Specified' }} </ion-item>
                <ion-item> Supplier : {{ product && product.supplier && product.supplier.length > 0 ? product?.supplier :
                    'Not Specified' }} </ion-item>
            </ion-list>
            <div v-if="product && product.quantity && product.quantity > 0">
                <ion-list-header>
                    <ion-label>Amount</ion-label>
                </ion-list-header>
                <div class="amount-controls">
                    <BButton
                        :class="{ 'bg-gray-100 text-gray-400 shadow-none pointer-events-none': productAmountToTake <= 1 }"
                        class="max-w-[100px]" @click="handleAmountChange('decrease')">- 1 </BButton>
                    <ion-input class="ion-text-center amount-input" type="tel" :value="productAmountToTake"
                        @change="productAmountToTake = $event.target.value"></ion-input>
                    <BButton
                        :class="{ 'bg-gray-100 text-gray-400 shadow-none pointer-events-none': !product || !product.quantity || productAmountToTake >= product.quantity }"
                        @click="handleAmountChange('increase')" class="max-w-[100px]">+ 1</BButton>
                    <BButton class="mt-20"
                        :class="{ 'bg-gray-100 text-gray-400 shadow-none pointer-events-none': !product || !product.quantity || productAmountToTake > product.quantity }"
                        @click="takeOutItem">
                        <ion-spinner v-if="store.loading" name="lines-sharp" color="primary"></ion-spinner>
                        <span v-else>TAKE</span>
                    </BButton>
                </div>
            </div>
        </ion-content>
        <ion-toast :is-open="store.toastBody.show" @didDismiss="store.showToast('close')" :color="store.toastBody.type"
            :message="store.toastBody.message" position="bottom" :duration="3000"></ion-toast>
    </ion-page>
</template>

<style>
.expiry-date {
    margin-left: 10px;
}

.amount-input {
    font-size: 60px;
    border: none;
}

.amount-btn {
    margin: 10px auto;
    width: 100px;
}

.amount-controls {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}

.finish-btn {
    width: 100%;
    margin-top: 80px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>