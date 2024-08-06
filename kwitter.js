const firebaseConfig = {
    apiKey: "AIzaSyArueijB4IAo1DHejqOfi7SXKSkNYtdEio",
    authDomain: "rizzler-hw.firebaseapp.com",
    databaseURL: "https://rizzler-hw-default-rtdb.firebaseio.com",
    projectId: "rizzler-hw",
    storageBucket: "rizzler-hw.appspot.com",
    messagingSenderId: "191280065253",
    appId: "1:191280065253:web:f9b248f1116a6998c9420c"
  };
  firebase.initializeApp(firebaseConfig);


  user_name=localStorage.getItem("user_name");
  document.getElementById("user_name").innrHTML="Welcome" + user_name + "!";


  function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}


function getData() 
{
firebase.database().ref("/").on('value',
function(snapshot) {document.getElementById("output").innerHTML =
"";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
Room_names = childKey;
//Start code
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
document.getElementById("output").innerHTML+=row;
//End code
});});}
getData();


function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name" , name);
    window.location="kwitter_page.html";
    }

    function logOut(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
     window.location.replace("index.html");
       }

   