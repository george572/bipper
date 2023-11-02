<!-- <script setup lang='ts'>
import TakeProductFromStorage from "@/components/storage-components/TakeProductFromStorage.vue";
import AddProductToStorage from "@/components/storage-components/AddProductToStorage.vue";
import { IonPage } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRoute  } from "vue-router";

const route = useRoute();
const showTakeProductsPage = ref(false);
const showAddProductsPage = ref(false);
onMounted(() => {
    if(route && route.query && route.query.action) {
        if (route.query.action === 'take') {
            showTakeProductsPage.value = true;
        } else {
            showAddProductsPage.value = true;
        }
    }
})
</script>

<template>
<ion-page>
    <TakeProductFromStorage  v-if="showTakeProductsPage"/>
    <AddProductToStorage  v-if="showAddProductsPage"/>
</ion-page>
</template> -->