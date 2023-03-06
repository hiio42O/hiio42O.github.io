/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need

importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6x7lhTmMu7Hu1T8ohS6YNmooU7_Ldsys",
  authDomain: "fir-test-9fe38.firebaseapp.com",
  projectId: "fir-test-9fe38",
  storageBucket: "fir-test-9fe38.appspot.com",
  messagingSenderId: "1061045071639",
  appId: "1:1061045071639:web:8fee234f7e69b8cdaa9152",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    // icon: "/firebase-logo.png",
  };
  new Notification("tetete");
  console.log(self.registration.showNotification);

  self.registration.showNotification(notificationTitle, notificationOptions);
});
