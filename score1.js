var database = firebase.database().ref();







var num = document.querySelector('.num');
var next = document.querySelector('.next');
var butsheep = document.querySelector(".butsheep")
butsheep.pause();


window.onload = function what(){
  var num = document.getElementById("nm");
  var next = document.getElementById("nt");
  var next_number = document.getElementById("ntnum");
  var next_btn = document.getElementById("ntbtn");
  var count = 0;
  next.onclick=function(){
    
     count = count + 1;
      nm.innerHTML = count ;
      ntnum.innerHTML = count;
      next_number.style.display='block';
      butsheep.play();
    
    }
    next_btn.onclick=function(){
    
      next_number.style.display ='none';
    
     }
   }
   var firebaseConfig = {
    // INITIALIZE FIREBASE
    
      apiKey: "AIzaSyAhQ2glcwTAKmSdOD0dqaLlagPi1MD5_fQ",
      authDomain: "line-up-dcf97.firebaseapp.com",
      databaseURL: "https://line-up-dcf97.firebaseio.com",
      projectId: "line-up-dcf97",
      storageBucket: "line-up-dcf97.appspot.com",
      messagingSenderId: "1019759150998",
      appId: "1:1019759150998:web:98c603baff7fbef30e3fb7",
    }
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();





