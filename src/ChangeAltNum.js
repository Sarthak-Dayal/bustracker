/** @format */
import { updateAltNum } from "./Data";

const ChangeAltNum = (props) => {
  return (
    <div className='login'>
      <div>
        <h1>Change Bus Number</h1>
      </div>
      <div>
        <h3>Enter the original bus number below:</h3>
      </div>
      <div>
        <input id='NumInput' placeholder='Original Number'></input>
      </div>
      <div>
        <h3>Enter the new bus number below:</h3>
      </div>
      <div>
        <input id='AltNumInput' placeholder='New Number'></input>
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

const processInputs = async (setPage) => {
  let num = document.getElementById("NumInput").value;
  let altNum = document.getElementById("AltNumInput").value;
  let boole = await updateAltNum(num, altNum);
  if (boole) {
    setPage(2);
  } else {
    borderChange();
  }
};

const borderChange = () => {
  document.getElementById("NumInput").style.border = "1px solid red";
  document.getElementById("AltNumInput").style.border = "1px solid red";
};

export default ChangeAltNum;
