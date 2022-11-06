/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import Busdata from "./data.json";
const firebaseConfig = {
  apiKey: "AIzaSyCRu8s0df6AqudfTeyC36vv--UjpIe3eTU",
  authDomain: "bustracker-41102.firebaseapp.com",
  databaseURL: "https://bustracker-41102-default-rtdb.firebaseio.com",
  projectId: "bustracker-41102",
  storageBucket: "bustracker-41102.appspot.com",
  messagingSenderId: "97855552997",
  appId: "1:97855552997:web:af1aa01cf22c9d213d430c",
  measurementId: "G-WMGMY7RVY2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const changeDoc = async (x, y, altNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  await updateDoc(docRef, {
    x: x,
    y: y,
    altNum: altNum,
    status: status,
  });
};

export const updateAltNum = async (num, altNum) => {
  try {
    const docRef = doc(db, "busdata", `${num}`);
    await updateDoc(docRef, {
      altNum: num === altNum ? "" : altNum,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const reset = () => {
  Busdata.map(async (data) => {
    await changeDoc(0, 0, "", data.num, "Not here");
  });
};

export const snapshot = (num, setX, setY, updateBus) => {
  const docRef = doc(db, "busdata", `${num}`);
  onSnapshot(docRef, async (doc) => {
    let dat = doc.data();
    setX(dat.x);
    setY(dat.y);
    updateBus(num, dat.status, dat.altNum);
  });
};
