import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyC6kqDk21x1W198xsFM0FoLEcEvdVuTBQ8",
  authDomain: "restaurant-management-sy-2bd47.firebaseapp.com",
  databaseURL: "https://restaurant-management-sy-2bd47.firebaseio.com",
  projectId: "restaurant-management-sy-2bd47",
  storageBucket: "restaurant-management-sy-2bd47.appspot.com",
  messagingSenderId: "652987355291"
};
 var firebaseObject=firebase.initializeApp(config);
 export default firebaseObject;