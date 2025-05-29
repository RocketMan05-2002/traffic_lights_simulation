import React,{ useEffect, useState } from 'react'
import Cell from './components/Cell';
import './styles.css'

const digitMap = {
  1: [2, 5, 8],
  2: [1, 2, 4, 5, 7, 8],
  3: [0, 1, 2, 4, 5, 6, 7, 8],
  4: [0, 2, 4, 5, 8],
  5: [0, 1, 2, 3, 4, 6, 7],
  6: [0, 3, 4, 5, 6, 7, 8],
  7: [0, 1, 2, 5, 8],
  8: [0, 1, 2, 4, 6, 7, 8],
  9: [0, 1, 2, 3, 5, 7, 8],
};

const App = () => {

    const[order,setOrder] = useState([]);
    const[input,setInput] = useState(null);
    const[showInput, setShowInput] = useState(null);

    const config = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];

    function onAddValue(e){
        if(e.keyCode === 13 && e.target.value){
            setInput(Number(e.target.value));
        }
    }

    useEffect(()=>{
        if(!input && input<1 && input>10) return;
        let current = input;
        const timer = setInterval(()=>{
            setOrder(digitMap[current] || []);
            setShowInput(current);
            current--;
            if(current<1){
                clearInterval(timer);
                setTimeout(()=>{
                    setOrder([]);
                    setShowInput(0);
                },2000);
            }
        },2000);
        return ()=>clearInterval(timer);
    },[input])

  return (
    <div className='wrapper'>
        <h1 style={{color:"red" , textTransform: "uppercase" }}>Traffic lights simulation</h1>
        <input autoFocus type='number' min={1} max={9} placeholder='enter the value to countdown' onKeyDown={onAddValue} />
        <div className='grid' style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}>
            {
                config.flat(1).map((_,ind)=>{
                    return <Cell 
                    key={ind}
                    filled={order.includes(ind)}
                    />
                })
            }
        </div>
        <h1 style={{ color:"red" }}>{showInput}</h1>
    </div>
  )
}

export default App;
