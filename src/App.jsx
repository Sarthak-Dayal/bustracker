/** @format */

import "./App.css";
import Busdata from "./data.json";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
// import Cryptr from "cryptr";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

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

const Bus = (props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const docRef = doc(db, "busdata", `${props.num}`);
  onSnapshot(docRef, async (doc) => {
    let dat = await doc.data();
    setX(dat.x);
    setY(dat.y);
  });
  const handleStop = async (event, dragElement) => {
    await setDoc(docRef, {
      x: dragElement.x,
      y: dragElement.y,
      altNum: props.altNum ? props.altNum : "",
      replacedNum: props.replacedNum ? props.replacedNum : "",
      num: `${props.num}`,
      status: props.status ? props.status : "not here",
    });
    setX(dragElement.x);
    setY(dragElement.y);
  };

  if (props.page === 2) {
    return (
      <Draggable onStop={handleStop} position={{ x: x, y: y }}>
        <div className='bus'>
          <Tippy
            content={
              <>
                {"Bus: " + props.num}
                <br></br>
                {"Status: " + props.status}
              </>
            }>
            <button className='busBtn'>
              <h2>
                {props.num} ({props.altNum})
              </h2>
            </button>
          </Tippy>
        </div>
      </Draggable>
    );
  } else {
    return (
      <div className='bus' position={{ x: x, y: y }}>
        <Tippy
          content={
            <>
              {"Bus: " + props.num}
              <br></br>
              {"Status: " + props.status}
            </>
          }>
          <button className='busBtn'>
            <h2>
              {props.num} ({props.altNum})
            </h2>
          </button>
        </Tippy>
      </div>
    );
  }
};

const BusNums = (props) => {
  const buses = Busdata.map((data) => {
    return (
      <Bus num={data.num} status={data.status} altNum={52} page={props.page} />
    );
  });

  return <div className='busbank'>{buses}</div>;
};

const SetStatusHere = (props) => {
  const buses = Busdata.map((data) => {});
};
const TitleSection = (props) => {
  return (
    <div className='title'>
      <h1> Reagan HS Bus Tracker</h1>
      <button className='APLoginBtn' onClick={() => props.setPage(1)}>
        AP Login
      </button>
    </div>
  );
};

const LoadingArea = (props) => {
  return <div className='load'></div>;
};

const WaitingArea = (props) => {
  return <div className='wait'></div>;
};

const UnarrivedArea = (props) => {
  return (
    <div className='unarrive'>
      <h1>Bus Bank</h1>
      <BusNums className='buss' page={props.page} />
    </div>
  );
};

const GoneArea = (props) => {
  return (
    <div className='gone'>
      <h1>Left Bus Area</h1>
    </div>
  );
};

const APLogin = (props) => {
  return (
    <div className='login'>
      <div>
        <h1>AP Login</h1>
      </div>
      <div>
        <h3>Enter your AP Pin below:</h3>
      </div>
      <div>
        <input id='APLoginInput' placeholder='PIN'></input>
      </div>
      <div className='APViewDiv'>
        <button className='backToHomeBtn' onClick={() => props.setPage(0)}>
          Back
        </button>
        <button
          className='APView'
          onClick={() =>
            getValueOfLogin() === "lol" ? props.setPage(2) : borderChange()
          }>
          Enter
        </button>
      </div>
    </div>
  );
};
function getValueOfLogin() {
  let input = document.getElementById("APLoginInput").value;
  return input;
}

function borderChange() {
  document.getElementById("APLoginInput").style.border = "5px solid red";
}

const APLogIn = (props) => {
  //code to enter the AP login pin/password
};

export default function App() {
  const [page, setPage] = useState(0);

  return (
    <div className='App'>
      <main>
        {page === 0 ? (
          <div>
            <TitleSection setPage={setPage} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea />
            </div>
            <UnarrivedArea page={page} />
            <GoneArea />
          </div>
        ) : page === 1 ? (
          <APLogin setPage={setPage} />
        ) : (
          <div>
            <TitleSection setPage={setPage} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea />
            </div>
            <UnarrivedArea page={page} />
            <GoneArea />
          </div>
        )}
      </main>
    </div>
  );
}
