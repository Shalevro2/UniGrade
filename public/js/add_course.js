import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, updateDoc, doc, arrayUnion, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

class Course{
    constructor(name, points, year, semester){
        this.name = name;
        this.points = points;
        this.year = year;
        this.semester = semester;
    }
}

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

$(document).ready(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            $("#enter").on('click', async(e)=>{
                var field = $('#add-course-form');
    
                if (field[0].checkValidity()) {
                    // TODO add here succsess message 
                } else {
                    // TODO add here failed message 
                    // Field is empty, show an error message or perform other actions
                    alert("Please fill in the required field.");
                    return;
                }
                console.log("click"); //test

                const dbref = doc(db, "courses", uid);
                const docsnap = await getDoc(dbref);

                const name = $("#course").val();
                const points = $("#points").val();
                const year = $("#year").val();
                const semester = $("#semester").val();
                console.log(name,points,year,semester);

                const course = new Course(name, points, year, semester);

                if (!docsnap.exists()) {
                    setDoc(dbref, {courses : Object.assign({}, course)});
                } else {
                    updateDoc(dbref,{courses:arrayUnion(Object.assign({}, course))});
                }

                $("#course").val("");
                $("#points").val("");
                $("#year").val("");
                $("#semester").val("");

            });

            $("#logout").click(()=>{            ///  save to signout button
                signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
            });
        } else {
            alert("you are not log in");
            window.location.href="./sign_up.html";
        }
      });

});
