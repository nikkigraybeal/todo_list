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

//DOM elements
const form = document.querySelector('form')
const itemName = form.elements[0]
const dueDate = form.elements[1]
const itemDetails = form.elements[2]
const subItem = form.elements[3]
const subDueDate = form.elements[4]
const subItemDetails = form.elements[5]
const todoList = document.querySelector('.todos')

//get form element values on submit
const handleSubmit = (e) => {
  e.preventDefault()
  console.log("itemName: ", itemName.value)
  console.log("dueDate: ", dueDate.value)
  console.log("itemDetails: ", itemDetails.value)
  console.log("subItem: ", subItem.value)
  console.log("subDueDate: ", subDueDate.value)
  console.log("subDetails: ", subItemDetails.value)
  generateTemplate()
  form.reset()
}
form.addEventListener('submit', handleSubmit)


//inject html for new todo item
const generateTemplate = () => {
  const html = `
  <li class="item">
        <div class="item-title">
          <span class="name">${itemName.value}</span>
          <span class="get-details">details</span>
          <span class="trashcan">trash</span>
        </div>
        
        <ul class="list-item-info hide">
          <li class="detail">Due: ${dueDate.value}</li>
          <li class="detail">Details: ${itemDetails.value}</li>
          <li class="sublist">
            <div class="item-title sub-item">
              <span class="name">${subItem.value}</span>
              <span class="get-details">details</span>
              <span class="trashcan">trash</span>
            </div>
            <ul class="list-item-info hide">
              <li class="detail sub-detail">Due: ${subDueDate.value}</li>
              <li class="detail sub-detail">Details: ${subItemDetails.value}</li>
            </ul>
          </li>
        </ul>
      </li> `

  todoList.innerHTML += html;
}

//show/hide item details and sub item details onclick
const getDetails = document.querySelector(".get-details")
const getSubDetails = document.querySelector(".get-sub-details")
const mainSec = document.querySelector(".main-section")
const subSec = document.querySelector(".sub-section")

const hidden = (el) => {
  let classList = el.classList
  let hidden
  classList.forEach(item => {
    item === 'hide' ? hidden = true : hidden = false
  })
  return hidden
}

getDetails.addEventListener('click', () => {
  if (hidden(mainSec)) {
    mainSec.classList.remove('hide')
    getDetails.innerHTML = "hide details"
  } else {
    mainSec.classList.add('hide')
    subSec.classList.add('hide')
    getDetails.innerHTML = "show details"
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


//show signup form on click
const loginSection = document.querySelector('.login-section')
const signupSection = document.querySelector('.signup-section')
const loginBtn = document.querySelector('.login')
const signupBtn = document.querySelector('.signup')

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
