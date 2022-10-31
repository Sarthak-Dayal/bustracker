/** @format */

import "./App.css";
import Busdata from "./data.json";
import { useEffect, useState } from "react";
import Bus from "./Bus";
import { updateDoc, reset, snapshot, updateDocWithoutXY } from "./Data";
import EmptyBus from "./EmptyBus";

const UnarrivedBuses = (props) => {
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
      <button className='APLoginBtn' onClick={() => props.resetBuses()}>
        Reset Buses
      </button>
    </div>
  );
};

const LoadingArea = (props) => {
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
      <button
        className='APLoginBtn'
        onClick={() => {
          console.log("CLICKED");
          props.setPage(3);
        }}>
        Update Bus Number
      </button>
      <UnarrivedBuses className='buss' page={props.page} buses={props.buses} />
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
const UpdateBusNumber = (props) => {
  const updateNum = (arr) => {
    props.changeAltNum(arr[0], arr[1]);
    props.setPage(2);
  };
  return (
    <div className='login'>
      <div>
        <h1>Update Bus Number</h1>
      </div>
      <div>
        <h3>Enter the original bus number below:</h3>
      </div>
      <div>
        <input id='OGNumInput' placeholder='Original Number'></input>
      </div>
      <div>
        <h3>Enter the new bus number below:</h3>
      </div>
      <div>
        <input id='NewNumInput' placeholder='New Number'></input>
      </div>
      <div className='APViewDiv'>
        <button className='backToHomeBtn' onClick={() => props.setPage(2)}>
          Back
        </button>
        <button
          className='APView'
          onClick={() => updateNum(getValuesOfUpdateNum())}>
          Enter
        </button>
      </div>
    </div>
  );
};

function getValuesOfUpdateNum() {
  let input1 = document.getElementById("OGNumInput").value;
  let input2 = document.getElementById("NewNumInput").value;
  return [input1, input2];
}
function getValueOfLogin() {
  let input = document.getElementById("APLoginInput").value;
  return input;
}

function borderChange() {
  document.getElementById("APLoginInput").style.border = "5px solid red";
}

export default function App() {
  const [page, setPage] = useState(0);
  const changePage = (pg) => {
    setPage(pg);
    setBuses(busesInit);
  };
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
            changeAltNum={changeAltNum}
          />
        );
      }
    }
    setBuses(newBuses);
  };
  const changeAltNum = (busNumber, newAltNum) => {
    let newBuses = [...buses];
    for (let i = 0; i < newBuses.length; i++) {
      let bus = buses[i];
      if (bus.props.num === busNumber) {
        buses[i] = (
          <Bus
            num={bus.props.num}
            altNum={newAltNum}
            page={page !== 0 ? 2 : 0}
            status={bus.props.status}
            changeStatus={changeStatus}
            changeAltNum={changeAltNum}
          />
        );
        updateDocWithoutXY(
          buses[i].props.altNum,
          bus.props.num,
          bus.props.status
        );
      }
    }
    setBuses(newBuses);
  };

  let busesInit;

  busesInit = Busdata.map((data, index) => {
    return (
      <Bus
        num={data.num}
        altNum={""}
        status={data.status}
        page={page}
        changeStatus={changeStatus}
        changeAltNum={changeAltNum}
      />
    );
  });

  const [buses, setBuses] = useState(busesInit);

  const resetBuses = () => {
    for (let bus of buses) {
      reset(bus.props.num);
    }
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

  return (
    <div className='App'>
      <main>
        {page === 0 ? (
          <div>
            <TitleSection setPage={changePage} resetBuses={resetBuses} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} />
            </div>
            <UnarrivedArea page={page} buses={buses} setPage={changePage} />
            <GoneArea buses={buses} />
          </div>
        ) : page === 1 ? (
          <APLogin setPage={changePage} />
        ) : page === 3 ? (
          <UpdateBusNumber setPage={changePage} changeAltNum={changeAltNum} />
        ) : (
          <div>
            <TitleSection setPage={changePage} resetBuses={resetBuses} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} />
            </div>
            <UnarrivedArea page={page} buses={buses} setPage={changePage} />
            <GoneArea buses={buses} />
          </div>
        )}
      </main>
    </div>
  );
}
