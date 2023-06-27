import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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


$(document).ready(()=>{
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            const db_ref = doc(db, "courses", uid);
            const docsnap = await getDoc(db_ref);

                if (!docsnap.exists()) {
                    
                } else {
                    var avg = 0;
                    var points = 0;
                    var data = docsnap.data().courses
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        avg += data[i].grade*data[i].points;
                        points += parseFloat(data[i].points);
                        console.log(avg +" " + points)
                      }
                    avg /= points;
                    pie(avg);
                }

        } else {
        alert("you are not log in");
        window.location.href="./sign_up.html";
    }

})});

function pie(avg) {
    // Define the chart to be drawn.
    google.charts.load('current', {packages: ['corechart']});     
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Browser');
    data.addColumn('number', 'Percentage');
    data.addRows([
       ['Average', avg],
       ["",100-avg]
    ]);
       
    // Set chart options
    var options = {
        'title':'My Average',
        titleTextStyle: {
            fontSize: 18,
            color: 'white',
            bold: true
        },
        titlePosition: 'center',
        'width':400,
        'height':350,
        pieHole: 0.6,
        slices: {
        0: { color: '#DC7B19' },
        1: { color: 'transparent' }
            },
        animation: {
            duration: 1000,
            easing: 'out'
            },
        backgroundColor: "#1A1918",
        legend: 'none',
        
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
 }
 google.charts.setOnLoadCallback(pie);

 google.charts.setOnLoadCallback(trendline);
function trendline() {
  var data = google.visualization.arrayToDataTable([
    ['Diameter', 'Age'],
    [8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]]);

  var options = {
    title: 'Average',
    hAxis: {title: 'years'},
    vAxis: {title: 'Average'},
    legend: 'none',
    trendlines: { 0: {} }    // Draw a trendline for data series 0.
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('trendline'));
  chart.draw(data, options);
}