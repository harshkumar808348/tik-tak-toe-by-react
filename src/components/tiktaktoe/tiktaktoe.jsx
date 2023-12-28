import React, { useRef, useState, useEffect } from 'react';
import './tiktaktoe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const TikTakToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }
    const newData = [...data];
    newData[num] = count % 2 === 0 ? 'x' : 'o';
    setData(newData);
    setCount(count + 1);
    e.target.innerHTML = newData[num] === 'x' ? `<img src=${cross_icon}>` : `<img src=${circle_icon}>`;
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
    if (count === 9) {
      setLock(true);
      titleRef.current.innerHTML = `It's a Draw!`;
    }
  };

  const won = (winner) => {
    setLock(true);
    const message = winner === 'x' ? `Congratulations: <img src=${cross_icon}>` : `Congratulations: <img src=${circle_icon}>`;
    titleRef.current.innerHTML = message;
  };

   const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach((box) => {
      box.textContent = ""; // Clear the text content of all boxes
    });
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
  };
  useEffect(() => {
    checkWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, data]); // Added 'data' and 'count' to the dependencies array

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' onClick={(e) => toggle(e, 0)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 1)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className='row2'>
          <div className='boxes' onClick={(e) => toggle(e, 3)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 4)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className='row'>
          <div className='boxes' onClick={(e) => toggle(e, 6)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 7)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TikTakToe;
