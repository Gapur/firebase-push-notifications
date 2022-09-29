importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBFZTdA0uHb7_LMTDJowvRJDjDcmzEoTLQ",
  authDomain: "fir-push-notifications-804ed.firebaseapp.com",
  projectId: "fir-push-notifications-804ed",
  storageBucket: "fir-push-notifications-804ed.appspot.com",
  messagingSenderId: "963673480986",
  appId: "1:963673480986:web:d9d5619c29fede473d56a3"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
