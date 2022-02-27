/*
classes: 
User
  has name
  has List
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

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
//firebase auth
const auth = getAuth();

//DOM elements
//add todo form
const addTodo = document.querySelector('.add-todo')
const itemName = addTodo.elements[0]
const dueDate = addTodo.elements[1]
const itemDetails = addTodo.elements[2]
const subItem = addTodo.elements[3]
const subDueDate = addTodo.elements[4]
const subItemDetails = addTodo.elements[5]
const addDetails = document.querySelector('.add-details')
const addDetailsBtn = document.querySelector('.add-details-btn')
const addTodoBtn = document.querySelector('.add-todo-btn')
const addSublistItemBtn = document.querySelector('.add-sublist-item-btn')
const addSublistItem = document.querySelector('.add-sublist')

//signup/login/logout
const signupSection = document.querySelector('.signup-section')
const userName = signupSection.elements[0] 
const userEmail = signupSection.elements[1] 
const userPassword = signupSection.elements[2] 

const loginSection = document.querySelector('.login-section')
const loginEmail = loginSection.elements[0]
const loginPassword = loginSection.elements[1]

const loginBtn = document.querySelector('.login')
const signupBtn = document.querySelector('.signup')
const logoutBtn = document.querySelector('.logout')

//todo list
const todoList = document.querySelector('.todos')
let getDetails = document.querySelectorAll(".get-details")

class User {
  constructor(name) {
    this.name = name
    this.list = new List()
  }
  createListItem (name, dueDate, details) {
    const newItem = new ListItem(name, dueDate, details)
    this.list = Object.assign(this.list, newItem)
  }
  
}

class List {
  constructor() {
    this.listItems = {}
    this.totalItems = this.listItems.length
  }
}

class ListItem {
  constructor(name, dueDate, details) {
    this.name = name
    this.dueDate = dueDate
    this.details = details
    this.subListItems = {}
    this.totalSubListItems = this.SubListItems.length

  }
}

class SubListItem {
  constructor(name, dueDate, details) {
    this.name = name
    this.dueDate = dueDate
    this.details = details
  }

}

//if user is logged in show todo list, else show login page

const checkUserStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      todoList.classList.remove('hide')
      loginSection.classList.add('hide')
      signupSection.classList.add('hide')
      loginBtn.classList.add('hide')
      signupBtn.classList.add('hide')
      logoutBtn.classList.remove('hide')
      addTodo.classList.remove('hide')
      console.log("user signed in")
      const uid = user.uid;
      // ...
    } else {
      todoList.classList.add('hide')
      loginSection.classList.remove('hide')
      signupSection.classList.add('hide')
      loginBtn.classList.add('hide')
      signupBtn.classList.remove('hide')
      logoutBtn.classList.add('hide')
      addTodo.classList.add('hide')
      console.log("user not signed in")
    }
  });
}

checkUserStatus()

//show signup/login form on click
signupBtn.addEventListener('click', () => {
  loginSection.classList.add('hide')
  signupSection.classList.remove('hide')
  signupBtn.classList.add('hide')
  loginBtn.classList.remove('hide')
})

loginBtn.addEventListener('click', () => {
  loginSection.classList.remove('hide')
  signupSection.classList.add('hide')
  signupBtn.classList.remove('hide')
  loginBtn.classList.add('hide')
})

//login returning user
const handleLogin = (e) => {
  e.preventDefault()

  //login user with firebase auth
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      checkUserStatus()
      loginSection.reset()
      //create new User obj 
      //const user = new User(userName.value)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  });
}

loginSection.addEventListener('submit', handleLogin)


//signup new user
const handleSignup = (e) => {
  e.preventDefault()

  console.log(userEmail.value, userName.value, userPassword.value)

  //create new user with firebase auth
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    checkUserStatus()
    signupSection.reset()
     //create new User obj
    const currentUser = new User(userName.value)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

signupSection.addEventListener('submit', handleSignup)

//logout user
const handleLogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  checkUserStatus()
}

logoutBtn.addEventListener('click', handleLogout)

//get form element values on submit for new todo
const handleSubmit = (e) => {
  e.preventDefault()
  generateTemplate()
  addTodo.reset()
}
addTodo.addEventListener('submit', handleSubmit)


//inject html for new todo item
const generateTemplate = () => {
  const html = `
  <li class="item">
        <div class="item-title">
          <span class="name">${itemName.value}</span>
          <span class="get-details">show details</span>
          <span class="trashcan">trash</span>
        </div>
        
        <ul class="list-item-info main-section hide">
          <li class="detail">Due: ${dueDate.value}</li>
          <li class="detail">Details: ${itemDetails.value}</li>
          <li class="sublist">
            <div class="item-title sub-item">
              <span class="name">${subItem.value}</span>
              <span class="get-sub-details">details</span>
              <span class="trashcan">trash</span>
            </div>
            <ul class="list-item-info sub-section hide">
              <li class="detail sub-detail">Due: ${subDueDate.value}</li>
              <li class="detail sub-detail">Details: ${subItemDetails.value}</li>
            </ul>
          </li>
        </ul>
      </li> `

  todoList.innerHTML += html;
  addClickEvents()
}

//show/hide item details and sub item details onclick
const hidden = (el) => {
  let classList = el.classList
  let hidden
  classList.forEach(item => {
    item === 'hide' ? hidden = true : hidden = false
  })
  return hidden
}

//add click events to show details on new todos
const addClickEvents = () => {
  getDetails = document.querySelectorAll(".get-details")
  getDetails.forEach(el => {
    let mainSec = el.parentElement.nextElementSibling
    let subSec = mainSec.children[2].children[1]
    let getSubDetails = mainSec.children[2].children[0].children[1]
    el.addEventListener('click', () => {
      if (hidden(mainSec)) {
        mainSec.classList.remove('hide')
        el.innerHTML = "hide details"
      } else {
        mainSec.classList.add('hide')
        subSec.classList.add('hide')
        el.innerHTML = "show details"
        getSubDetails.innerHTML = "show details"
      }
    })
    getSubDetails.addEventListener('click', () => {
      if (hidden(subSec)) {
        subSec.classList.remove('hide')
        getSubDetails.innerHTML = "hide details"
      } else {
        subSec.classList.add('hide')
        getSubDetails.innerHTML = "show details"
      }
    })
  })
}

addClickEvents()




//show add-todo form details on click
addDetailsBtn.addEventListener('click', () => {
  addDetails.classList.remove('hide')
})

addSublistItemBtn.addEventListener('click', () => {
  addSublistItem.classList.remove('hide')
})

//add user to collection
/*
try {
  const docRef = await addDoc(collection(db, "users"), {
    name: "nikki",
    list: {}
  })
  console.log("Document written with ID: ", docRef.id)
} catch(e) {
  console.error("Error adding document: ", e)
}
*/
