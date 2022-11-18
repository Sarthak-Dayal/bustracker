/** @format */
import { useState } from "react";

const APLogin = (props) => {
  const [APLoginValue, setAPLoginValue] = useState("");
  return (
    <div className='login'>
      <div>
        <h1>AP Login</h1>
      </div>
      <div>
        <h3>Enter your AP Pin below:</h3>
      </div>
      <div>
        <input
          type='text'
          id='APLoginInput'
          placeholder='PIN'
          onChange={(e) => setAPLoginValue(e.target.value)}
          value={APLoginValue}
        />
      </div>
      <div className='APViewDiv'>
        <button className='backToHomeBtn' onClick={() => props.setPage(0)}>
          Back
        </button>
        <button
          className='APView'
          onClick={() =>
            APLoginValue === "1234" ? props.setPage(2) : borderChange()
          }>
          Enter
        </button>
      </div>
    </div>
  );
};

function borderChange() {
  document.getElementById("APLoginInput").style.border = "5px solid red";
}

export default APLogin;
