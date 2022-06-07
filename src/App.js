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
        <section className='border-solid hover:border-dotted'>
          <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
            onClick={() => getMoreQuotes()} style={{ marginRight: '10px' }}>Generate More</button>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Amount : {results}
          </button>
          {/* SELECT AMOUNT OF QUOTES FROM DROPDOWN */}
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
            {amount.map((num, idx) => <button key={idx} className='btn btn-small btn-margin' onClick={() => setAmount(num)}>{num}</button>)}
          </div>
        </section>
        {/* DISPLAY QUOTES USING SLICE AND MAP FUNCS */}
      </section>
      <section className='FlexContainer'>
        {quotes.slice(start, end).map((item, idx) =>
          <div key={idx} className=' bg-white shadow-md hover:shadow-lg rounded px-15 pt-6 pb-8 mb-4 shadow-md'>
            <p>"{item.text ? item.text : "Hold up this quote is missing??"}"</p>
            <p><strong>{item.author ? item.author : "Anonymous"}</strong></p></div>)}
      </section>
    </div>
  );
}

export default App;
