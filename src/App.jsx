/** @format */

import "./App.css";
import Busdata from "./data.json";
import { useState } from "react";
import Bus from "./Bus";
import { reset, changeDoc } from "./Data";
import EmptyBus from "./EmptyBus";
import APLogin from "./APLogin";
import ChangeAltNum from "./ChangeAltNum";
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
      {props.page !== 0 ? (
        <>
          <button className='APLoginBtn' onClick={() => reset()}>
            Reset
          </button>
          <button className='APLoginBtn' onClick={() => props.setPage(3)}>
            Update Bus Number
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const LoadingArea = (props) => {
  //const collectionRef = collection(db, "busdata");
  return (
    <div className='load'>
      {props.page !== 0 ? (
        <>
          <button className='APLoginBtn' onClick={() => props.moveToDeparted()}>
            Move loading to departed
          </button>
        </>
      ) : (
        <></>
      )}
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

export default function App() {
  const updateBus = (busNumber, newStatus, newAltNum) => {
    let newBuses = [...buses];
    for (let i = 0; i < newBuses.length; i++) {
      let bus = buses[i];
      if (bus.props.num === busNumber) {
        buses[i] = (
          <Bus
            num={bus.props.num}
            altNum={newAltNum}
            page={page !== 0 ? 2 : 0}
            status={newStatus}
            updateBus={updateBus}
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
        page={page !== 0 ? 2 : 0}
        updateBus={updateBus}
      />
    );
  });

  const changePage = (newPg) => {
    setPage(newPg);
    console.log(page);
    let newBuses = buses.map((bus) => {
      return (
        <Bus
          num={bus.props.num}
          status={bus.props.status}
          page={newPg !== 0 ? 2 : 0}
          updateBus={updateBus}
        />
      );
    });
    setBuses(newBuses);
    console.log(buses);
  };

  const moveToDeparted = () => {
    for (let i = 0; i < buses.length; i++) {
      let bus = buses[i];
      if (
        bus.props.status === "First Lane" ||
        bus.props.status === "Second Lane"
      ) {
        changeDoc(
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
            <TitleSection setPage={changePage} page={page} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} page={page} />
            </div>
            <UnarrivedArea page={page} buses={buses} />
            <GoneArea buses={buses} />
          </div>
        ) : page === 1 ? (
          <APLogin setPage={changePage} />
        ) : page === 3 ? (
          <ChangeAltNum setPage={changePage} />
        ) : (
          <div>
            <TitleSection setPage={changePage} page={page} />
            <div className='bkgrdImg'>
              <WaitingArea />
              <LoadingArea moveToDeparted={moveToDeparted} page={page} />
            </div>
            <UnarrivedArea page={page} buses={buses} />
            <GoneArea buses={buses} />
          </div>
        )}
      </main>
    </div>
  );
}
