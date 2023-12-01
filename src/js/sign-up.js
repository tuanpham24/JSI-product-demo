const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("repeat-password");
const signUpBtn = document.getElementById("sign-up-btn");
const googleBtn = document.getElementById("google-btn");

// Google provider: Sign in with Google
const googleProvider = new firebase.auth.GoogleAuthProvider();
console.log(googleProvider);

// Use firestore
const db = firebase.firestore();


// Function handle Sign up with Email và Password
function signUp(event) {
  event.preventDefault();

  let fullName = fullNameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  let repeatPassword = repeatPasswordInput.value;

  let data = {
    fullName,
    email,
    password,
    repeatPassword,
  };

  // Check if any field is empty
  if (!fullName || !email || !password || !repeatPassword) {
    alert("Please fill all field!");
    return;
  }

  // Check if any field is empty
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    alert("Email is invalid! Try again");
    return;
  }

  // Check if passwords match
  if (passwordInput.value !== repeatPasswordInput.value) {
    alert("Passwords don't match");
    return;
  }

  // User Fire Auth to create email and password
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      return db.collection("users").add(data);
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Register successfully!");
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorMessage);
      // ..
    });
}

// Function handle Sign up with Google
function signInWithGoogle() {
  firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    let credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = credential.accessToken;
    // The signed-in user info.
    let user = result.user;

    alert("Successfully: Sign in with Google!")
  }).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
    console.log(errorMessage);
    // alert("Failure: Sign in with Google!")
  });
}

signUpBtn.addEventListener("click", function (event) {
  signUp(event);
});

googleBtn.addEventListener("click", function (event) {
  signInWithGoogle();
});