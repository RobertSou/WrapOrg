const firebase = require("firebase");


let firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let firestore = firebase.firestore();

module.exports.doadorRegister = async (name, email, password, rpassword) => {
  if(password != rpassword) return {err: "A senha não bate" };
  await auth.createUserWithEmailAndPassword(email, password).then((user) => {
    let userUid = auth.currentUser.uid;
    let db = firestore;
    db.collection('doadores').doc(userUid).set({
        email,
        emailVertified: false,
        name,
        online: false,
        onlock: false,
        password,
    });
    return JSON.stringify(user);
  }).catch((e) => {
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/weak-password") {
      return { err: "A senha é muito fraca" };
    } else if(errorCode == "auth/email-already-in-use"){
      return { err: "O email já está em uso" };
    } else {
      return { err: errorMsg };
    }
  });
};

module.exports.doadorLogin = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password).then((user) => {
    // Get the user data from the database.
    let db = firestore.collection('doadores').doc(user.uid);
    return user;
  }).catch((e) => {
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/wrong-password") {
      return { err: "A senha está errada" };
    } else if(errorCode == "auth/email-already-in-use"){
      return { err: "O email já está em uso" };
    } else {
      return { err: errorMsg };
    }
  });
};

return module.exports;
