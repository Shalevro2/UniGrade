$('.form')
	.find('input, textarea')
	.on('keyup blur focus', function (e) {
		var $this = $(this),
			label = $this.prev('label');

		if (e.type === 'keyup') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.addClass('active highlight');
			}
		} else if (e.type === 'blur') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.removeClass('highlight');
			}
		} else if (e.type === 'focus') {
			if ($this.val() === '') {
				label.removeClass('highlight');
			} else if ($this.val() !== '') {
				label.addClass('highlight');
			}
		}
	});

$('.tab a').on('click', function (e) {
	e.preventDefault();

	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	var target = $(this).attr('href');

	$('.tab-content > div').not(target).hide();

	$(target).fadeIn(600);
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const firebaseConfig = {
	apiKey: 'AIzaSyAwcnp0pIBn4M4fU-M89D2li0vImSxv-oI',
	authDomain: 'ude-d8926.firebaseapp.com',
	projectId: 'ude-d8926',
	storageBucket: 'ude-d8926.appspot.com',
	messagingSenderId: '137442087140',
	appId: '1:137442087140:web:5d85d36b89111b87e31cf1',
	measurementId: 'G-TYJDTDV5TJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

$(document).ready(() => {
	$('#signup').click(() => {
		var email = $('#email').val();
		var password = $('#password').val();

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				window.location.href = './add_course.html';
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	});
	$('#login').click(() => {
		var email = $('#lemail').val();
		var password = $('#lpassword').val();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				window.location.href = './add_course.html';
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	});
});
