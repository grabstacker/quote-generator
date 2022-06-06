import './App.css';
import { quotes } from './quotes/quotesZen';
import { useState, useEffect, useRef } from 'react'
function App() {
  //SET STATE WITH HOOKS  
  const [results, setResults] = useState(5)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(results)
  const templateGetMoreQuotes = useRef()
  const amount = [5, 10, 15, 20, 25]
  //GET MORE QUOTES ON BUTTON CLICK
  const getMoreQuotes = () => {
    const end = Math.floor(Math.random() * quotes.length)
    setEnd(end)
    setStart(end - results)
  }
  //USEREF
  templateGetMoreQuotes.current = getMoreQuotes
  //SET THE AMOUNT OF RESULTS DEFAULTS TO 5 BUT CAN BE CHANGED BY UX DROPDOWN
  const setAmount = (num) => {
    setResults(num)
  }
  //RUN ONCE WHEN THE APP STARTS
  useEffect(() => {
    templateGetMoreQuotes.current()
  }, [results])


  return (
    <div>
      <h1>Quote Generator!</h1>
      {/* SETUP UX ELEMENTS */}
      <section className='FlexContainer'>
        <div className="dropdown" >
          <button className='btn btn-sm' onClick={() => getMoreQuotes()} style={{ marginRight: '10px' }}><strong>Generate More</strong></button>
          <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Amount : {results}
          </button>
          {/* SELECT AMOUNT OF QUOTES FROM DROPDOWN */}
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
            {amount.map((num, idx) => <button key={idx} className='btn btn-small btn-margin' onClick={() => setAmount(num)}>{num}</button>)}
          </div>
        </div>
        {/* DISPLAY QUOTES USING SLICE AND MAP FUNCS */}
      </section>
      <section className='FlexContainer'>
        {quotes.slice(start, end).map((item, idx) =>
          <div key={idx}>
            <p>"{item.text ? item.text : "Hold up this quote is missing??"}"</p>
            <p><strong>{item.author ? item.author : "Anonymous"}</strong></p></div>)}
      </section>
    </div>
  );
}

export default App;
