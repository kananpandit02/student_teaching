// script.js

// Student Registration
function registerStudent() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const classValue = document.getElementById("class").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      return firebase.firestore().collection("users").doc(uid).set({
        name, dob, email, mobile, class: classValue, subject,
        role: "student", approved: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("Student registered successfully!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

// Teacher Registration
function registerTeacher() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();
  const resume = document.getElementById("resume").files[0];

  if (!resume || resume.type !== "application/pdf") {
    alert("Please upload a PDF resume.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      const ref = firebase.storage().ref(`resumes/${uid}.pdf`);
      return ref.put(resume).then(() => ref.getDownloadURL()).then((url) => {
        return firebase.firestore().collection("users").doc(uid).set({
          name, dob, email, mobile, subject, resumeURL: url,
          role: "teacher", approved: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
    })
    .then(() => {
      alert("Teacher registered successfully!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

// Login
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      return firebase.firestore().collection("users").doc(uid).get();
    })
    .then((doc) => {
      const user = doc.data();
      if (!user.approved) {
        alert("Your account is not approved yet.");
        return firebase.auth().signOut();
      }
      if (user.role === "student") {
        window.location.href = "dashboard_student.html";
      } else {
        window.location.href = "dashboard_teacher.html";
      }
    })
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
