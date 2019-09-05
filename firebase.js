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
let db = firebase.firestore();

module.exports.doadorRegister = async (name, email, password, rpassword) => {
  try{
    if(password != rpassword) return { err : "As senhas não batem"};
    let response = await auth.createUserWithEmailAndPassword(email, password);
    let userUid = response.user.uid;
    db.collection('doadores').doc(userUid).set({
        email,
        emailVertified: false,
        name,
        online: false,
        onlock: false,
        password,
    });
    return JSON.stringify(user);
  }catch(e) {
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/weak-password") {
      return { err: "A senha é muito fraca" };
    } else if(errorCode == "auth/email-already-in-use"){
      return { err: "O email já está em uso" };
    } else {
      return { err: errorMsg };
    }
  };
};

module.exports.doadorLogin = async (email, password) => {
  try{
    let response = await auth.signInWithEmailAndPassword(email, password);
    let dbUser = db.collection('doadores').doc(response.user.uid);
    return response.user;
  }catch(e){
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/wrong-password") {
      return { err: "A senha está errada" };
    } else {
      return { err: errorMsg };
    }
  };
};

return module.exports;
