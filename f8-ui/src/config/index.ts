import routes from './routes';
import firebaseConfig from './firebase.config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

(function initFirebase() {
    initializeApp(firebaseConfig);
})();

const storage = getStorage();

const config = {
    routes,
    storage,
};

export default config;
