import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBOkn-EWv1v2J1vxMk17u7AA9Lh3XouZVg',
  authDomain: 'tools-fartech-dev-bcbb9.firebaseapp.com',
  databaseURL: 'https://tools-fartech-dev-bcbb9.firebaseio.com',
  projectId: 'tools-fartech-dev-bcbb9',
  storageBucket: 'tools-fartech-dev-bcbb9.appspot.com',
  messagingSenderId: '958947595545',
  appId: '1:958947595545:web:aa2159b859ee6ebf9de188',
  measurementId: 'G-1D6B9CMWJN',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
