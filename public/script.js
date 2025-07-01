// Register Student
function registerStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        name,
        email,
        role: "student"
      });
    })
    .then(() => {
      alert("Student registered successfully!");
      window.location.href = "dashboard_student.html";
    })
    .catch(err => alert(err.message));
}

// Register Teacher
function registerTeacher() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const file = document.getElementById("resume").files[0];

  if (!file || file.type !== "application/pdf") {
    alert("Please upload a PDF resume.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const storageRef = storage.ref("resumes/" + cred.user.uid + ".pdf");
      return storageRef.put(file).then(() => storageRef.getDownloadURL())
        .then(url => {
          return db.collection("users").doc(cred.user.uid).set({
            name,
            email,
            role: "teacher",
            resumeURL: url
          });
        });
    })
    .then(() => {
      alert("Teacher registered successfully!");
      window.location.href = "dashboard_teacher.html";
    })
    .catch(err => alert(err.message));
}

// Login
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).get();
    })
    .then(doc => {
      const data = doc.data();
      if (data.role === "student") {
        window.location.href = "dashboard_student.html";
      } else if (data.role === "teacher") {
        window.location.href = "dashboard_teacher.html";
      }
    })
    .catch(err => alert(err.message));
}

// Logout
function logoutUser() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Forgot Password
function resetPassword() {
  const email = document.getElementById("resetEmail").value;
  auth.sendPasswordResetEmail(email)
    .then(() => alert("Password reset link sent."))
    .catch(err => alert(err.message));
}
