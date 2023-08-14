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
				pieCulc(docsnap);
				lineCulc(docsnap);
				const courses = docsnap.data().courses;
				displayCoursesTable(courses);
			}
		} else {
			window.location.href = './sign_up.html';
		}
	});
});

function displayCoursesTable(courses) {
	const tableBody = document.querySelector('#courses-table-body');

	courses.forEach((course) => {
		const row = document.createElement('tr');
		const nameCell = createTableCell(course.name);
		const yearCell = createTableCell(course.year);
		const semesterCell = createTableCell(course.semester);
		const pointsCell = createTableCell(course.points);
		const gradeCell = createTableCell(calculateTotalGrade(course.grades));
		const delBut = createTableCell();

		row.appendChild(nameCell);
		row.appendChild(yearCell);
		row.appendChild(semesterCell);
		row.appendChild(pointsCell);
		row.appendChild(gradeCell);
		row.appendChild(delBut);

		tableBody.appendChild(row);
	});
}

function createTableCell(content) {
	const cell = document.createElement('td');
	cell.textContent = content;
	cell.style.color = 'white';
	return cell;
}

function calculateTotalGrade(grades) {
	let totalGrade = 0;
	grades.forEach((grade) => {
		const percent = parseInt(grade.precent);
		const gradeValue = parseInt(grade.grade);
		totalGrade += (percent * gradeValue) / 100;
	});
	return totalGrade.toFixed(2);
}

function pie(avg) {
	// Define the chart to be drawn.
	google.charts.load('current', { packages: ['corechart'] });
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Browser');
	data.addColumn('number', 'Percentage');
	data.addRows([
		['Average', avg],
		['', 100 - avg],
	]);

	// Set chart options
	var options = {
		title: 'My Average',
		titleTextStyle: {
			fontSize: 18,
			color: 'white',
			bold: true,
		},
		titlePosition: 'center',
		width: 400,
		height: 350,
		pieHole: 0.6,
		slices: {
			0: { color: '#DC7B19' },
			1: { color: 'transparent' },
		},
		animation: {
			duration: 1000,
			easing: 'out',
		},
		backgroundColor: '#1A1918',
		legend: 'none',
	};

	// Instantiate and draw the chart.
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}
google.charts.setOnLoadCallback(pie);

function pieCulc(docsnap) {
	var avg = 0;
	var points = 0;
	var data = docsnap.data().courses;
	for (var i = 0; i < data.length; i++) {
		var grade = 0;
		for (var j = 0; j < data[i].grades.length; j++) {
			grade += data[i].grades[j].precent * 0.01 * data[i].grades[j].grade;
		}
		avg += grade * data[i].points;
		points += parseFloat(data[i].points);
	}
	avg /= points;
	pie(avg);
}

function lineCulc(docsnap) {
	var avg_arr = [[0, 0, 0]];
	var data = docsnap.data().courses;
	for (var year = 1; year <= 7; year++) {
		for (var semester = 1; semester <= 2; semester++) {
			var avg = 0;
			var points = 0;
			var sem;
			if (semester == 1) {
				sem = 'A';
			} else {
				sem = 'B';
			}
			for (var i = 0; i < data.length; i++) {
				if (data[i].year == year && data[i].semester == sem) {
					var grade = 0;
					for (var j = 0; j < data[i].grades.length; j++) {
						grade += data[i].grades[j].precent * 0.01 * data[i].grades[j].grade;
					}
					avg += grade * data[i].points;
					points += parseFloat(data[i].points);
				}
			}
			if (points == 0) avg_arr.push([year + semester - 1, 0, 0]);
			else avg_arr.push([year + semester - 1, avg / points, points]);
		}
	}
	for (var i = 1; i < avg_arr.length; i++) {
		avg_arr[i] = [
			avg_arr[i][0],
			(avg_arr[i][1] * avg_arr[i][2] + avg_arr[i - 1][1] * avg_arr[i - 1][2]) / (avg_arr[i][2] + avg_arr[i - 1][2]),
			avg_arr[i][2] + avg_arr[i - 1][2],
		];
	}
	lineChart(avg_arr);
}

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

google.charts.load('current', { packages: ['line'] });
google.charts.setOnLoadCallback(lineChart);

function lineChart(data_arr) {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'semester');
	data.addColumn('number', 'Average');
	data.addColumn('number', 'points');

	data.addRows(data_arr);

	var options = {
		chart: {
			title: 'Average progress during the semesters',
			subtitle: '',
		},
		width: 400,
		height: 350,
		backgroundColor: '#1A1918',
		legend: 'none',
		titleTextStyle: {
			fontSize: 16,
			color: 'white',
			bold: true,
		},
		legend: 'none',
	};

	var chart = new google.charts.Line(document.getElementById('lineChart'));

	chart.draw(data, google.charts.Line.convertOptions(options));
}
