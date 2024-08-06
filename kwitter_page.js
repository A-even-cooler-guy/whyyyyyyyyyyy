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
  room_name=localStorage.getItem("room_name");
  
function send(){
  
    msg=document.getElementById("msg").value;
    console.log(msg);
    firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
    })
    document.getElementById("msg").value=" ";

  }

  function getData(){
    firebase.database().ref("/" + room_name).on("value" , function(snapshot){
      document.getElementById("output").innerHTML="";
      snapshot.forEach(function(childSnapshot){
        childKey=childSnapshot.key;
        childData=childSnapshot.val();
        if(childKey!="purpose"){
          firebase_message_id=childKey;
          message_data=childData;
          name=message_data["name"];
          message=message_data["message"];
          like=message_data["like"];
          nametag="<h4>" + name + "<img class='user_tick' src='wapple.jpg'><h4>";
          messagetag="<h4 class='message_h4'>" + message + "</h4>";
          liketag="<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='update_like(this.id)'>";
          thumbsup="<span class='glyphicon glyphicon-thumbs-up'>like:" + like + "</span></button>"
          row= nametag + messagetag + liketag + thumbsup;
          document.getElementById("output").innerHTML+=row;
          
      
        }
      })
    })
   }
getData();

function update_like(message_id){
console.log("clicked on like button - " + message_id);
button_id=message_id;
like=document.getElementById(button_id).value;
console.log(like)
updateLike=Number(like) + 1;
console.log(updated_likes);
firebase.database().ref(room_name).child(message_id).update({
  like:updateLike
})
}

function logOut(){
 localStorage.removeItem("user_name");
 localStorage.removeItem("room_name");
 window.location.replace("index.html");
  }

