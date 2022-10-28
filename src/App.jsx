/** @format */

import "./App.css";
import Busdata from "./data.json";
import { useState } from "react";
import Bus from "./Bus";

const UnarrivedBuses = (props) => {
  //TODO: PULL FROM FIREBASE
  const buses = Busdata.map((data) => {
    return <Bus num={data.num} status={data.status} page={props.page} />;
  });
  return <div className='busbank'>{buses}</div>;
};

const DepartedBuses = (props) => {
  const buses = props.buses.map((data) => {
    return <Bus num={data.num} status='Departed' page={props.page} />;
  });

  return <div className='busbank'>{buses}</div>;
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
  //const collectionRef = collection(db, "busdata");
  return (
    <div className='load'>
      <button>Move waiting buses to departed area</button>
    </div>
  );
};

const WaitingArea = (props) => {
  return <div className='wait'></div>;
};

const UnarrivedArea = (props) => {
  return (
    <div className='unarrive'>
      <h1>Bus Bank</h1>
      <UnarrivedBuses className='buss' page={props.page} />
    </div>
  );
};

const GoneArea = (props) => {
  return (
    <div className='gone'>
      <h1>Departed Bus Area</h1>
      {DepartedBuses}
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
