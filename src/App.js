import React,{ useEffect, useState } from 'react'
import Cell from './components/Cell';
import './styles.css'

const digitMap = {
    0: [0, 1, 2, 3, 5, 6, 7, 8],
    1: [2, 5, 8],
    2: [1, 2, 4, 5, 7, 8],
    3: [0, 1, 2, 4, 5, 6, 7, 8],
    4: [0, 2, 4, 5, 8],
    5: [0, 1, 2, 3, 4, 6, 7],
    6: [0, 3, 4, 5, 6, 7, 8],
    7: [0, 1, 2, 5, 8],
    8: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    9: [0, 1, 2, 3, 5, 7, 8]
}

const App = () => {
    const[leftOrder, setLeftOrder] = useState([]);
    const[rightOrder, setRightOrder] = useState([]);
    const[input,setInput] = useState(null);
    const [showInput,setShowInput] = useState(null);

    const [isChinese, setIsChinese] = useState(false);

    const config = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];

    function onAddValue(e){
        if(e.keyCode === 13 && e.target.value){
            setInput(e.target.value);
        }
    }

    useEffect(()=>{
        if(!input || input<1 || input>99) return;
        let current = input;

        const timer = setInterval(()=>{
            const left  = Math.floor(current/10);
            const right = current % 10;

            setLeftOrder(digitMap[left]|| []);
            setRightOrder(digitMap[right]||[]);
            setShowInput(current);

            current--;
            if(current<1){
                clearInterval(timer);
                setTimeout(()=>{
                    setLeftOrder([]);
                    setRightOrder([]);
                    setShowInput(0);
                },1000);
            }
        },1000);
        return ()=>clearInterval(timer);

    },[input]);

    useEffect(() => {
    const toggleInterval = setInterval(() => {
      setIsChinese(prev => !prev);
    }, 5000); // 5 seconds

    return () => clearInterval(toggleInterval); // Cleanup on unmount
  }, []);


  return (
    <div className='wrapper'>
        <h1
        className="header"
        style={{ color: "#ff3c3c", textTransform: "uppercase", fontSize: "60px" }}
      >
        {isChinese ? '交通灯模拟器' : 'Traffic Lights Simulator'}
      </h1>
        <input type='number' placeholder='enter number to coundown' min={1} max={99} onKeyDown={onAddValue} />
        <div className='grid-box' style={{ display: "flex",  gap:"20px" }}>
            <div className='grid' style={{ gridTemplateColumns: `repeat(3,1fr)` }}>
                {
                    config.flat(1).map((_,ind)=>(
                        <Cell 
                        key={ind}
                        filled={leftOrder.includes(ind)}
                        />
                    ))
                }
            </div>
            <div className='grid' style={{ gridTemplateColumns: `repeat(3,1fr)` }} >
                {
                    config.flat(1).map((_,ind)=>(
                        <Cell
                        key={ind}
                        filled={rightOrder.includes(ind)}
                        />
                    ))
                }
            </div>
        </div>
        <h1 style={{ color: "#ff3c3c", fontSize:"70px" }}>{showInput}</h1>
    </div>
  )
}

export default App
