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

export const updateDoc = async (x, y, altNum, num, status) => {
  const docRef = doc(db, "busdata", `${num}`);
  await setDoc(docRef, {
    x: x,
    y: y,
    altNum: "",
    num: `${num}`,
    status: status,
  });
};

export const reset = () => {
  Busdata.map(async (data) => {
    await updateDoc(0, 0, "", data.num, "Not here");
  });
};

export const snapshot = (num, setX, setY, setStatus) => {
  const docRef = doc(db, "busdata", `${num}`);
  onSnapshot(docRef, async (doc) => {
    let dat = doc.data();
    setX(dat.x);
    setY(dat.y);
    setStatus(num, dat.status);
  });
};
