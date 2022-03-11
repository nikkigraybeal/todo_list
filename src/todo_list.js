//firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs, Timestamp, query, where, orderBy, deleteDoc  } from 'firebase/firestore';
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

//add todo form
const addTodoForm = document.querySelector('.add-todo-form')
const itemName = addTodoForm.elements[0]
const itemDueDate = addTodoForm.elements[1]
const itemDetails = addTodoForm.elements[2]
const addDetailsBtn = document.querySelector('.add-details-btn')
const addDetails = document.querySelector('.add-details')

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
      addTodoForm.classList.remove('hide')
      fetchTodos()
      console.log("user signed in")
    } else {
      todoList.classList.add('hide')
      loginSection.classList.remove('hide')
      signupSection.classList.add('hide')
      loginBtn.classList.add('hide')
      signupBtn.classList.remove('hide')
      logoutBtn.classList.add('hide')
      addTodoForm.classList.add('hide')
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
  });
}

loginSection.addEventListener('submit', handleLogin)


//signup new user
const handleSignup = (e) => {
  e.preventDefault()

  //create new user with firebase auth
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    checkUserStatus()
    signupSection.reset()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}

signupSection.addEventListener('submit', handleSignup)

//logout user
const handleLogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    checkUserStatus()
  }).catch((error) => {
    console.log(error)
  });
}

logoutBtn.addEventListener('click', handleLogout)

//add new todo to db
const handleSubmit = async (e) => {
  e.preventDefault()

  //validate itemDueDate
  let dueDate
  itemDueDate.value === '' ? 
  dueDate = Timestamp.fromDate(new Date()) : 
  dueDate = Timestamp.fromDate(new Date(itemDueDate.value))

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      userId: auth.currentUser.uid,
      itemName: itemName.value,
      itemDueDate: dueDate,
      itemDetails: itemDetails.value,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch(e) {
    console.error("Error adding document: ", e)
  }
  fetchTodos()
  addDetails.classList.add('hide')
  addTodoForm.reset()

}
addTodoForm.addEventListener('submit', handleSubmit)

//fetch todos from db
const fetchTodos = async () => {
  const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid), orderBy("itemDueDate"));
  
  const querySnapshot = await getDocs(q);
  todoList.innerHTML = ''
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    generateTemplate(data)
  });

}

//inject html for new todo item
const generateTemplate = (data) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(data.itemDueDate.toDate()).toLocaleDateString("en-US", options)
  
  const html = `
    <li class="todo">
        <div class="todo-title">
          <span class="name">${data.itemName}</span>
          <span class="get-details">show details</span>
          <span class="material-icons trashcan">delete</span>
        </div>
        
        <ul class="todo-details hide">
          <li class="detail">${date}</li>
          <li class="detail">Details: ${data.itemDetails}</li>
        </ul>
      </li>
      `
  todoList.innerHTML += html
  addClickEvents()
}

//show add-todo-form details on click
addDetailsBtn.addEventListener('click', () => {
  addDetails.classList.remove('hide')
})

//dynamically create click events for showing details and deleting todos
const addClickEvents = () => {
  const getDetails = document.querySelectorAll('.get-details')
  getDetails.forEach(el => {
    let todoDetails = el.parentElement.nextElementSibling
    el.addEventListener('click', () => {
      if (hidden(todoDetails)) {
        todoDetails.classList.remove('hide')
        el.innerHTML = "hide details"
      } else {
        todoDetails.classList.add('hide')
        el.innerHTML = "show details"
      }
    })
  })

  const trashcans = document.querySelectorAll('.trashcan')
  trashcans.forEach(can => {
    can.addEventListener('click', async (e) => {
      const name = e.target.parentElement.children[0].innerHTML
      //delete todo from db
      const todosRef = collection(db, "todos")
      const q = query(todosRef, where("itemName", "==", name));
      const querySnapshot = await getDocs(q); querySnapshot.forEach((dc) => {
        // doc.data() is never undefined for query doc snapshots
        deleteDoc(doc(db, "todos", dc.id));
      });
      fetchTodos()
    })
  }) 
}

const hidden = (el) => {
  let classList = el.classList
  let hidden
  classList.forEach(item => {
    item === 'hide' ? hidden = true : hidden = false
  })
  return hidden
}

addClickEvents()