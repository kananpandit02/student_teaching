// Student registration
function registerStudent() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const subject = document.getElementById("subject").value.trim();  // ✅ added

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      return firebase.firestore().collection("users").doc(uid).set({
        name,
        email,
        subject,   // ✅ store subject
        role: "student",
        approved: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("Student registered! Await admin approval.");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}


// Teacher registration
function registerTeacher() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const subject = document.getElementById("subject").value.trim(); // ✅ added
  const file = document.getElementById("resume").files[0];

  if (!file || file.type !== "application/pdf") {
    alert("Upload a valid PDF resume.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      const storageRef = firebase.storage().ref(`resumes/${uid}.pdf`);
      return storageRef.put(file).then(() => storageRef.getDownloadURL())
        .then((url) => {
          return firebase.firestore().collection("users").doc(uid).set({
            name,
            email,
            subject,   // ✅ store subject
            role: "teacher",
            resumeURL: url,
            approved: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
    })
    .then(() => {
      alert("Teacher registered! Await admin approval.");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}
