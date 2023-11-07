import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword } from 'firebase/auth';
import { FirebaseConfig } from 'utility';

export class FirebaseService {

    static app;

    static auth;

    static init = () => {
        const app = initializeApp(FirebaseConfig);
        FirebaseService.app = app;
        FirebaseService.auth = getAuth()
    }

    static updateUserPassword = (newPassword) => {
        updatePassword(this.auth.currentUser, newPassword).then((data) => {
            return data
        }).catch((error) => {
            return error
        });
    }

}