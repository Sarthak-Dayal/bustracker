/** @format */
import { updateAltNum } from "./Data";
import { useState } from "react";

const ChangeAltNum = (props) => {
  const [altNum, setAltNum] = useState("");
  const [OGNum, setOGNum] = useState("");

  const processInputs = async (setPage) => {
    let num = OGNum;
    let aNum = altNum;
    let boole = await updateAltNum(num, aNum);
    if (boole) {
      setPage(2);
    } else {
      borderChange();
    }
  };

  return (
    <div className='login'>
      <div>
        <h1>Change Bus Number</h1>
      </div>
      <div>
        <h3>Enter the original bus number below:</h3>
      </div>
      <div>
        <input
          id='NumInput'
          placeholder='Original Number'
          onChange={(e) => setOGNum(e.target.value)}></input>
      </div>
      <div>
        <h3>Enter the new bus number below:</h3>
      </div>
      <div>
        <input
          id='AltNumInput'
          placeholder='New Number'
          onChange={(e) => setAltNum(e.target.value)}></input>
      </div>
      <div className='APViewDiv'>
        <button className='backToHomeBtn' onClick={() => props.setPage(0)}>
          Back
        </button>
        <button className='APView' onClick={() => processInputs(props.setPage)}>
          Enter
        </button>
      </div>
    </div>
  );
};

const borderChange = () => {
  document.getElementById("NumInput").style.border = "1px solid red";
  document.getElementById("AltNumInput").style.border = "1px solid red";
};

export default ChangeAltNum;
