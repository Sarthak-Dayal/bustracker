/** @format */

import "./App.css";
import Busdata from "./data.json";
import { useState } from "react";
import Bus from "./Bus";
import { reset, updateDoc } from "./Data";
import EmptyBus from "./EmptyBus";
const UnarrivedBuses = (props) => {
  //TODO: PULL FROM FIREBASE
  let buses = props.buses.map((bus) => {
    if (bus.props.status !== "Departed") return bus;
    else return <EmptyBus></EmptyBus>;
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
      <button className='APLoginBtn' onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
};

const LoadingArea = (props) => {
  //const collectionRef = collection(db, "busdata");
  return (
    <div className='load'>
      <button onClick={() => props.moveToDeparted()}>
        Move loading to departed
      </button>
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
      <UnarrivedBuses buses={props.buses} className='buss' page={props.page} />
    </div>
  );
};

const GoneArea = (props) => {
  let buses = props.buses.map((bus) => {
    if (bus.props.status === "Departed") {
      return bus;
    }
  });
  return (
    <div className='unarrive'>
      <h1>Departed Bus Area</h1>
      <div className='buss'>
        <div className='gone'>{buses}</div>
      </div>
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
  const changeStatus = (busNumber, newStatus) => {
    let newBuses = [...buses];
    for (let i = 0; i < newBuses.length; i++) {
      let bus = buses[i];
      if (bus.props.num === busNumber) {
        buses[i] = (
          <Bus
            num={bus.props.num}
            altNum={bus.props.altNum}
            page={page !== 0 ? 2 : 0}
            status={newStatus}
            changeStatus={changeStatus}
          />
        );
      }
    }
    setBuses(newBuses);
  };
  const [page, setPage] = useState(0);

  const busesInit = Busdata.map((data) => {
    return (
      <Bus
        num={data.num}
        status={data.status}
        page={page}
        changeStatus={changeStatus}
      />
    );
  });

  const changePage = (newPg) => {
    setPage(newPg);
    let newBuses = buses.map((bus) => {
      return (
        <Bus
          num={bus.props.num}
          status={bus.props.status}
          page={page}
          changeStatus={changeStatus}
        />
      );
    });
    setBuses(newBuses);
  };

  const moveToDeparted = () => {
    for (let i = 0; i < buses.length; i++) {
      let bus = buses[i];
      if (
        bus.props.status === "First Lane" ||
        bus.props.status === "Second Lane"
      ) {
        updateDoc(
          0,
          0,
          bus.props.altNum ? bus.props.altNum : "",
          bus.props.num,
          "Departed"
        );
      }
    }
  };

  const [buses, setBuses] = useState(busesInit);

  return (
    <div className='App'>
      <main>
        {page === 0 ? (
          <div>
            <TitleSection setPage={changePage} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} />
            </div>
            <UnarrivedArea page={page} buses={buses} />
            <GoneArea buses={buses} />
          </div>
        ) : page === 1 ? (
          <APLogin setPage={changePage} />
        ) : (
          <div>
            <TitleSection setPage={changePage} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} />
            </div>
            <UnarrivedArea page={page} buses={buses} />
            <GoneArea buses={buses} />
          </div>
        )}
      </main>
    </div>
  );
}
