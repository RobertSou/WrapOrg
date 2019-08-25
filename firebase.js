const firebase = require("firebase");

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

module.exports.SignUpWithEmailAndPassword = async (email, password) => {
  try {
    let user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return JSON.stringify(user);
  } catch (e) {
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/weak-password") {
      return { err: "A senha é muito fraca" };
    } else {
      return { err: errorMsg };
    }
  }
};

module.exports.SignInWithEmailAndPassword = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    let errorCode = e.code;
    let errorMsg = e.message;
    if (errorCode == "auth/wrong-password") {
      return { err: "A senha está errada" };
    } else {
      return { err: errorMsg };
    }
  }
};

return module.exports;
