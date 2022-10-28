/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtxTiqlzClHAXCqmZxY1H7Oo5t6LE1JgA",
  authDomain: "bustracker-bb1b0.firebaseapp.com",
  databaseURL: "https://bustracker-bb1b0-default-rtdb.firebaseio.com",
  projectId: "bustracker-bb1b0",
  storageBucket: "bustracker-bb1b0.appspot.com",
  messagingSenderId: "898162625326",
  appId: "1:898162625326:web:7c527d61e501a6aee588bf",
  measurementId: "G-3SEVK1SKKC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const updateDoc = async (x, y, altNum, replacedNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  await setDoc(docRef, {
    x: x,
    y: y,
    altNum: altNum,
    replacedNum: replacedNum,
    num: `${num}`,
    status: status,
  });
};

export const reset = async (altNum, replacedNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  updateDoc(0, 0, altNum, replacedNum, num, status);
};

export const snapshot = (num, setX, setY, setStatus) => {
  const docRef = doc(db, "busdata", `${num}`);
  onSnapshot(docRef, async (doc) => {
    let dat = await doc.data();
    setX(dat.x);
    setY(dat.y);
    setStatus(dat.status);
  });
};
