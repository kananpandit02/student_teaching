// Student registration
function registerStudent() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const studentClass = document.getElementById("class").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      const uid = userCred.user.uid;
      return firebase.firestore().collection("users").doc(uid).set({
        name,
        dob,
        email,
        mobile,
        class: studentClass,
        subject,
        role: "student",
        approved: true,  // ✅ auto-approve
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("Student registered successfully!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}


// Teacher registration
function registerTeacher() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();
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
            dob,
            email,
            mobile,
            subject,
            resumeURL: url,
            role: "teacher",
            approved: true,  // ✅ auto-approve
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
