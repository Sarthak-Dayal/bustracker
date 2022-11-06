/** @format */

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

export default APLogin;
