function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.textContent = "Please enter email and password.";
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // ✅ Successful login
      const user = userCredential.user;
      msg.style.color = "green";
      msg.textContent = "Login successful. Redirecting...";
      window.location.href = "dashboard.html"; // Later use role to redirect
    })
    .catch((error) => {
      msg.textContent = error.message;
    });
}
