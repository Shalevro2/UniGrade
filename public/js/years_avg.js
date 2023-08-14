import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore, updateDoc, doc, arrayUnion, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAwcnp0pIBn4M4fU-M89D2li0vImSxv-oI',
    authDomain: 'ude-d8926.firebaseapp.com',
    projectId: 'ude-d8926',
    storageBucket: 'ude-d8926.appspot.com',
    messagingSenderId: '137442087140',
    appId: '1:137442087140:web:5d85d36b89111b87e31cf1',
    measurementId: 'G-TYJDTDV5TJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

$(document).ready(() => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const db_ref = doc(db, 'courses', uid);
            const docsnap = await getDoc(db_ref);

            if (!docsnap.exists()) {
            } else {
                const courses = docsnap.data().courses;
            }
        } else {
            window.location.href = './sign_up.html';
        }
    });
});


$('#logout1').click(() => {
    ///  save to signout button
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
});
