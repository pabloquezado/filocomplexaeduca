import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase, ref, set, get, push, child, update, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCV3-Mjk8hYv5hba9qbCM0DUTXQNp9FDE",
    authDomain: "login-form-d0508.firebaseapp.com",
    databaseURL: "https://login-form-d0508-default-rtdb.firebaseio.com/",
    projectId: "login-form-d0508",
    storageBucket: "login-form-d0508.firebasestorage.app",
    messagingSenderId: "319356886739",
    appId: "1:319356886739:web:c6f3d7a62f684e5079fe26"
  };

  // Inicializa Firebase
  const app = initializeApp(firebaseConfig);

  // Banco de dados
  const database = getDatabase(app);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    if(!user) {
        window.location = '../index.html';
      }
        })

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserName').innerText=userData.name;
            }
            else{
                console.log("nenhum documento encontrado com o ID pretendido")
            }
        })
        .catch((error)=>{
            console.log("Erro ao encontrar documento");
        })
    }
    else{
        console.log("Id de usuário não encontrado em armazenamento local")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='../index.html';
    })
    .catch((error)=>{
        console.error('Erro no logout:', error);
    })
  })
const button = document.getElementById("saveReal");
button.addEventListener('click', () => {
  var source = document.getElementById("here").value
  var category = document.getElementById("options").value

  if(source ==="" || category ==="1"){
    alert('Campo vazio. Clique em "visualizar" para gerar o HTML e escolha uma categoria.')
  }
  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists() && source !=="" && category !=="1"){
              
                const db = getDatabase();
                const userData=docSnap.data();
                set(ref(db, 'users/' + userData.name + '/posts'), {
                  página: source,
                  categoria: category
                });
                alert(userData.name + ', sua página foi salva com sucesso!')
                document.getElementById("here").value = '';
                document.getElementById("options").value = "1";
            }
        })
    }
  })
});
