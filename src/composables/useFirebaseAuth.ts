import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export function useFirebaseAuth() {
    const signInWithEmailAndPassword = async (userData: UserAuthData) => {
        const result = await FirebaseAuthentication.signInWithEmailAndPassword({
            email: userData.email,
            password: userData.password,
        });
        return result.user;
    };

    const createUserWithEmailAndPassword = async (userData: UserAuthData) => {
        const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
            email: userData.email,
            password: userData.password,
        });
        return result.user;
    };

    const applyActionCode = async () => {
        await FirebaseAuthentication.applyActionCode({ oobCode: '1234' });
    };

    const confirmPasswordReset = async () => {
        await FirebaseAuthentication.confirmPasswordReset({
            oobCode: '1234',
            newPassword: '4321',
        });
    };

    const getCurrentUser = async () => {
        const result = await FirebaseAuthentication.getCurrentUser();
        return result.user;
    };

    const signOut = async () => {
        await FirebaseAuthentication.signOut();
    };

    const getIdToken = async () => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            return;
        }
        const result = await FirebaseAuthentication.getIdToken();
        return result.token;
    };

    const sendEmailVerification = async () => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            return;
        }
        await FirebaseAuthentication.sendEmailVerification();
    };

    const sendPasswordResetEmail = async () => {
        await FirebaseAuthentication.sendPasswordResetEmail({
            email: 'mail@example.com',
        });
    };
    return { signInWithEmailAndPassword, createUserWithEmailAndPassword, getCurrentUser, signOut}
}
