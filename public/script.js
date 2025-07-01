const db = firebase.firestore();
const storage = firebase.storage();

function registerStudent() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const studentClass = document.getElementById("class").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !email || !password) {
    msg.textContent = "Please fill all fields.";
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const uid = cred.user.uid;
      return db.collection("users").doc(uid).set({
        role: "student",
        name, dob, email, phone, class: studentClass, subject,
        approved: false
      });
    })
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "Registered! Wait for admin approval.";
    })
    .catch(err => msg.textContent = err.message);
}

function registerTeacher() {
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const teacherClass = document.getElementById("class").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const password = document.getElementById("password").value.trim();
  const resume = document.getElementById("resume").files[0];
  const msg = document.getElementById("msg");

  if (!name || !email || !password || !resume) {
    msg.textContent = "All fields and resume are required.";
    return;
  }

  let uid = null;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cred => {
      uid = cred.user.uid;
      const storageRef = storage.ref(`resumes/${uid}.pdf`);
      return storageRef.put(resume);
    })
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      return db.collection("users").doc(uid).set({
        role: "teacher",
        name, dob, email, phone, class: teacherClass, subject,
        resumeURL: url,
        approved: false
      });
    })
    .then(() => {
      msg.style.color = "green";
      msg.textContent = "Teacher registered! Await admin approval.";
    })
    .catch(err => msg.textContent = err.message);
}
