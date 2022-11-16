/** @format */
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { changeDoc, reset, snapshot } from "./Data";
import { useState, useRef } from "react";
import Draggable from "react-draggable";

const Bus = (props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const busRef = useRef();
  const [showtp, setShowtp] = useState(false);

  snapshot(props.num, setX, setY, props.updateBus);

  const handleStop = async (event, dragElement) => {
    //const busX = busRef.current.offsetLeft + dragElement.x;
    const busY = busRef.current.offsetTop + dragElement.y;
    let stat = "Not here";
    if (busY > 430 && busY <= 570) {
      dragElement.y = 515 - busRef.current.offsetTop;
      stat = "First Lane";
    }
    if (busY > 295 && busY <= 430) {
      dragElement.y = 380 - busRef.current.offsetTop;
      stat = "Second Lane";
    }
    if (busY <= 295) {
      stat = "Waiting";
    }
    if (props.status == "Departed") stat = props.status;
    changeDoc(
      dragElement.x,
      dragElement.y,
      props.altNum ? props.altNum : "",
      props.num,
      stat
    );
  };

  return props.page === 0 ? (
    <Draggable onDrag={null} position={{ x: x, y: y }}>
      <div
        className='bus'
        ref={busRef}
        onMouseEnter={(e) => (showtp ? null : setShowtp(true))}
        onMouseLeave={(e) => (showtp ? setShowtp(false) : null)}
        onClick={(e) => (showtp ? setShowtp(false) : setShowtp(true))}
        onTouchEndCapture={(e) =>
          showtp ? setShowtp(false) : setShowtp(true)
        }>
        <Tippy
          content={
            <>
              {"Bus: " + props.num}
              <br></br>
              {"Status: " + props.status}
            </>
          }
          visible={showtp}>
          <button className='busBtn'>
            <h3>
              {props.num} <br />
              {props.altNum !== "" ? "(" + props.altNum + ")" : <></>}
            </h3>
          </button>
        </Tippy>
      </div>
    </Draggable>
  ) : (
    <Draggable position={{ x: x, y: y }} onStop={handleStop}>
      <div className='bus' ref={busRef}>
        <Tippy
          content={
            <>
              {"Bus: " + props.num}
              <br></br>
              {"Status: " + props.status}
            </>
          }>
          <button className='busBtn'>
            <h3>
              {props.num} <br />
              {props.altNum !== "" ? "(" + props.altNum + ")" : <></>}
            </h3>
          </button>
        </Tippy>
      </div>
    </Draggable>
  );
};

export default Bus;
