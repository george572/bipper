import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "@/composables/useFirebaseAuth";
import { useLocalStorage } from "@/composables/useLocalStorage";

const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = useFirebaseAuth();

export const useAuthStore = defineStore("FirebaseAuth", () => {
    const loading = ref(false);
    const { setLocalStorageItem } = useLocalStorage();
    const toastBody = ref({
        show: false,
        message: "" as unknown,
        type: "success"
    });

    const signIn = async (email: string, password: string) => {
        loading.value = true;
        try {
            const loginResp = await signInWithEmailAndPassword({ email, password });
            setLocalStorageItem('uid', loginResp?.uid);
        } catch (error: any) {
            showToast('open', 'danger', error.message);
        }
        loading.value = false;
    }

    const signUp = async (email: string, password: string) => {
        loading.value = true;
        try {
            const resp = await createUserWithEmailAndPassword({ email, password });
            console.log(resp, 'es aris user add')
            showToast('open', 'success', 'Successfully signed Up!');
        } catch (error: any) {
            showToast('open', 'danger', error.message);
        }
        loading.value = false;
    }

    const showToast = (action: string, type?: string | null, message?: String | null) => {
        if (action === 'open') {
            if (type === 'success') {
                toastBody.value.show = true;
                message && message.length > 0 ? toastBody.value.message = message : toastBody.value.message = "Product Added Successfully";
                /// dark is meant as success in this context
                toastBody.value.type = 'dark';
            } else if (type === 'danger' && message && message.length > 0) {
                toastBody.value.show = true;
                toastBody.value.message = message;
                toastBody.value.type = 'danger';
            }
            else {
                toastBody.value.show = true;
                toastBody.value.message = "Error Occurred";
                toastBody.value.type = 'danger';
            }
        } else {
            toastBody.value.show = false;
        }
    }


    return { signIn, signUp, toastBody, showToast, loading };
});
