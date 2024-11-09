import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const emptyArr = ['', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef()];

  // inputs ko handle karne ke liye ek state variable ka use karenge
  const [inputs, setinputs] = useState(emptyArr);
  const [missing, setmissing] = useState(emptyArr);

  const CODE = '1234';

  // useRef() ke use se ab hum focus maintain karenge

  // reload hone par focus nxt input tag par jana chahiye uske liye useEffect(),reference use karenge

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if (!Number(val))
      return;
    // setinputs ko set karna padega for rendering of data in inputs uske liye pehle inputs ko copy karna hai
    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
}

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setinputs(copyInputs);
  }
 

  const handleOnKeyDown = (e, index) => {
    console.log(e.keyCode, index);
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setinputs(copyInputs);
      //INPUT  feild main data set hogaya backspace click kiye toh data delete ho raha hai ab bas focus shift karni hai nxt feild main
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    // paste kia hua data ko store karega data variable
    console.log(data);
    // paste function ko implement karo
    if (!Number(data) || data.length !== inputs.length)
      return;

    const pasteCode = data.split('');
    setinputs(pasteCode);
    // data Paste ho raha hai ab hum ko focus ko last input main shift karana hai
    refs[inputs.length - 1].current.focus();
  }

  // jsb bhi button pe click ho toh empty boxes par red colour se indicate hona chahiye
  // us button ke liye ek or state ko maintain karna padega 
  const handleSubmit = () => {
    const missed = inputs.map((item,i) => {
      if (item === '')
        return i;
    }).filter((item)=>(item || item === 0))
    console.log(missed);
    setmissing(missed);
    
    if (missed.length) {
      return
    }

    const userInput = inputs.join('');
    const ismatch = userInput === CODE;
    const msg = ismatch ? 'Code is Valid' : 'Code is Invalid';
    alert(msg)



  }
  
  return (
    <div className="App">
      <h1>OTP Handler</h1>
      <div className='container'>
        
        <div className='input-Tags'>
          {/* ye normal practice hai */}
        {/* <input  type='number'  />
        <input type='number' />
        <input type='number' />
        <input type='number' /> */}
          {/* for better practice we can use array of list and use the by using map() */}

          {
            emptyArr.map((item, i) => {
              return <input
                value={inputs[i]}
                key={i}
                onChange={(e) => handleInputChange(e, i)} 
                onKeyDown={(e)=>handleOnKeyDown(e,i)}
                ref={refs[i]}
                type='text'
                maxLength="1"
                // paste Functionality
                onPaste={handlePaste}
                className={missing.includes(i) ? 'error' : ""}
              />
            })
          }

      </div>
      <div className='submit-btn'>
          <button
            onClick={handleSubmit}
            type='submit'
            className='btn'>Submit</button>
      </div>
      </div>
    </div>
  );
}

export default App;
