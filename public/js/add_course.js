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
                    console.log("ofir gf");
                    $("#div-success-alert").removeClass("d-none");
                    $("#div-failed-alert").addClass("d-none");

                } else {
                    // Field is empty, show an error message or perform other actions
                    $("#div-failed-alert").removeClass("d-none");
                    $("#div-success-alert").addClass("d-none");
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

            $("#logout1").click(()=>{            ///  save to signout button
                signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
            });
        } else {
            window.location.href="./sign_up.html";
        }
      });

});


    
      
$(document).ready(function() {
    // Delete button click event
    $(document).on("click", ".delete-button", function() {
      $(this).closest("tr").remove();
    });

    // Add button click event
    $("#addBtn").click(function() {
      var newRow = `
        <tr>
          <td><input type="text" class="form-control bg-dark text-white" placeholder="course name" required></td>
          <td><input type="number" step="any" min="0" class="form-control bg-dark text-white" placeholder="percent" required></td>
          <td><input type="number" min="0" class="form-control bg-dark text-white" placeholder="grade" required></td>
          <td>
            <button class="cssbuttons-io-button delete-button">
              <svg style="color: white" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 8H4V7H11V8Z" fill="white"></path> </svg>
              <span>delete</span>
            </button>
          </td>
        </tr>
      `;
      $("#tbody").append(newRow);
    });
  });