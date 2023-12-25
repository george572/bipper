<script setup lang='ts'>
import { IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useHaptics } from '@/composables/useHaptics';
const { hapticsImpactMedium } = useHaptics();
import { Upload, Download } from 'lucide-vue-next';
import BButton from '@/components/base/B-Button.vue';
import { LogOut } from 'lucide-vue-next';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth';
import { useLocalStorage } from "@/composables/useLocalStorage";

const router = useRouter();
const { deleteLocalStorageItem} = useLocalStorage();
const { signOut } = useFirebaseAuth();


const logOut = async () => {
    await signOut();
    deleteLocalStorageItem('uid')
    router.push({ name: 'auth' });
};

const productAction = (action: string) => {
    hapticsImpactMedium();
    action === 'take' ? router.push({ name: 'take product' }) : router.push({ name: 'add product' })
}
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true" :forceOverscroll="false" color="secondary">
            <ion-header :translucent="true" color="secondary">
                <ion-toolbar color="secondary">
                    <ion-title>Storage</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-header collapse="condense">
                <ion-toolbar color="secondary">
                    <ion-title class="ion-text-center page-title">Storage Management</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-card-header>
                <ion-card-title class="ion-margin-left"> Action </ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <div class="flex flex-col items-center justify-center gap-10 h-[50vh]">
                    <BButton @click="productAction('add')">
                        <template #title>Add Product</template>
                        <template #icon>
                            <Upload />
                        </template>
                    </BButton>
                    <BButton @click="productAction('take')">
                        <template #title>Take Product</template>
                        <template #icon>
                            <Download />
                        </template>
                    </BButton>
                </div>
            </ion-card-content>
            <BButton class="absolute bottom-5 right-5 w-[50px] h-[20px] bg-red-600" @click="logOut">
                <template #icon>
                    <LogOut class="min-w-[30px] text-red-600" />
                </template>
            </BButton>
        </ion-content>
    </ion-page>
</template>

<style scoped></style>