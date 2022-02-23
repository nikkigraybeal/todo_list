/*
classes: 
List
  has ListItems
  has number of ListItems

  createNewListItem
  deleteListItem
ListItem
  has name
  has dueDate
  has details
  has SubListItems
  has number of SubListItems
SubListItems
  has name
  has dueDate
  has details
  
*/

//firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9jk6_fOnuG5glZxJmzGdeFfP_H2ip--0",
  authDomain: "todo-list-16832.firebaseapp.com",
  projectId: "todo-list-16832",
  storageBucket: "todo-list-16832.appspot.com",
  messagingSenderId: "346962552564",
  appId: "1:346962552564:web:a5bc9513a45acc76a360a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db)
console.log(collection)
try {
  const docRef = await addDoc(collection(db, "users"), {
    name: "nikki",
    list: {}
  })
  console.log("Document written with ID: ", docRef.id)
} catch(e) {
  console.error("Error adding document: ", e)
}
