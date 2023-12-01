const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("sign-in-btn");
const googleBtn = document.getElementById("google-btn");

// Function handle Sign in with Email và Password
function signIn(event) {
  event.preventDefault();

  let email = emailInput.value;
  let password = passwordInput.value;

  // Check if any field is empty
  if (!email || !password) {
    alert("Please fill all field!");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    let user = userCredential.user;
    console.log(user);
    alert("Sign in successfully!")
    // window.location.assign("http://127.0.0.1:5500");

  })
  .catch((error) => {
    alert("Email or Password is not correct! Try again.")
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    console.log(errorMessage);
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

signInBtn.addEventListener("click", function (event) {
  signIn(event);
});

googleBtn.addEventListener("click", function (event) {
  signInWithGoogle();
});