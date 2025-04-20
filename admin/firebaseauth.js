 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

 const firebaseConfig = {
   apiKey: "AIzaSyCCV3-Mjk8hYv5hba9qbCM0DUTXQNp9FDE",
   authDomain: "login-form-d0508.firebaseapp.com",
   projectId: "login-form-d0508",
   storageBucket: "login-form-d0508.firebasestorage.app",
   messagingSenderId: "319356886739",
   appId: "1:319356886739:web:c6f3d7a62f684e5079fe26"
 };
 // Inicializar Firebase
 const app = initializeApp(firebaseConfig);

const signUp = document.getElementById("cadastrar");
signUp.addEventListener('click', (event) =>{ 
    event.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const name=document.getElementById("usuario").value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user=userCredential.user;
        const userData={
            email: email,
            name: name
        };  
        window.alert("Conta criada com sucesso!")   
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(() =>{
            window.location.href="admin.html";
        })
        .catch((error)=>{
            console.error("error", error);
        })
    })
    .cath((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            alert("Esse email já está em uso!")  
        }
        else{
            alert("não foi possível cadastrar novo usuário")  
        }
    })
});
const signIn=document.getElementById('login');
signIn.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       window.alert("Login efetuado com sucesso.")
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='admin.html';
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
        window.alert("Email ou senha incorreta.")   
       }
       else{
        window.alert("Essa conta não existe.")  
       }
   })
})
