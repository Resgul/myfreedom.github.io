// var firebaseConfig = {
//   apiKey: "AIzaSyCQ7h4ZPAUvujRy0AUHU7NlE0IjDzXTa4g",
//   authDomain: "project-resgul.firebaseapp.com",
//   databaseURL: "https://project-resgul.firebaseio.com",
//   projectId: "project-resgul",
//   storageBucket: "project-resgul.appspot.com",
//   messagingSenderId: "1006199687151",
//   appId: "1:1006199687151:web:c1fa2c1830fdba44ad581a",
//   measurementId: "G-X8KJS47900"
// };

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const firebase = require("firebase");
// require("firebase/firestore");

// var db = firebase.firestore();
// //Добавление и запись
// db.collection("Reshad").add({
//   name: "Reshad",
//   score: 45
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });
// //Получение
// db.collection("Reshad").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });