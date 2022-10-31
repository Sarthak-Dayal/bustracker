/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIkAEUTmy-SA17wdY_G1dHEqQ8GtiuiIM",
  authDomain: "bustracker-5c911.firebaseapp.com",
  projectId: "bustracker-5c911",
  storageBucket: "bustracker-5c911.appspot.com",
  messagingSenderId: "783412167818",
  appId: "1:783412167818:web:c620551d6b74deae4cd973",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateDoc = async (x, y, altNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  await setDoc(docRef, {
    x: x,
    y: y,
    altNum: altNum,
    num: `${num}`,
    status: status,
  });
};

export const updateDocWithoutXY = async (altNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  const docSnap = await getDoc(docRef);
  let dat;

  if (docSnap.exists()) {
    dat = docSnap.data();
  } else {
    console.log("No such document!");
  }

  await setDoc(docRef, {
    x: dat.x,
    y: dat.y,
    altNum: altNum,
    num: `${num}`,
    status: status,
  });
};

export const reset = async (num) => {
  const docRef = doc(db, "busdata", `${num}`);
  updateDoc(0, 0, "", "", num, "Not here");
};

export const snapshot = (num, setX, setY, setStatus, changeAltNum) => {
  const docRef = doc(db, "busdata", `${num}`);
  onSnapshot(docRef, async (doc) => {
    let dat = doc.data();
    setX(dat.x);
    setY(dat.y);
    setStatus(num, dat.status);
    changeAltNum(num, dat.altNum);
  });
};
