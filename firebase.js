const firebase = require("firebase")

let firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

firebase.initializeApp(firebaseConfig)

let auth = firebase.auth()
let db = firebase.firestore()

module.exports.doadorLogin = async (email, password) => {
  let ErrArray = []
  try{
    let response = await auth.signInWithEmailAndPassword(email, password)
    //let dbUser = db.collection('doadores').doc(response.user.uid)
    return response.user
  }catch(e){
    let errorCode = e.code
    let errorMsg = e.message
    if (errorCode == "auth/wrong-password")
      ErrArray.push({ passwordWrongError: "A senha está errada" })
    else ErrArray.push({ othersErrors: errorMsg })
  }
}

module.exports.doadorRegister = async (name, email, password, rpassword) => {

  let ErrArray = []
  if(password != rpassword) return ErrArray.push({ passwordMatchError: "As senhas não batem"})
  await auth.createUserWithEmailAndPassword(email, password).then(res => {
    db.collection('doadores').doc(res.user.uid).set({
      email: email,
      emailVertified: false,
      name: name,
      online: false,
      onlock: false,
    })
    return res.user;
  }).catch(e => {
    let eCode = e.code
    let eMsg = e.message
    if (eCode == "auth/weak-password") 
      ErrArray.push({ passwordWeakError: "A senha é muito fraca" })
    else if (eCode == "auth/email-already-in-use")
      ErrArray.push({ emailInUseError: "O email já está em uso" })
    else
      ErrArray.push({ othersErrors: eMsg })
    return ErrArray
  })
}

return module.exports
