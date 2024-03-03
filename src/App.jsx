import { useState } from 'react'


function Kotak({value, onKotakClick}) {

  return <button  className='kotak' onClick={onKotakClick} >{value}</button>
}

function Papan( {xIsNext, kotaks, onPlay}) {

function handleClick(i) {

if (kotaks[i] || win(kotaks)) return;

const kotaksBaru = kotaks.slice();

kotaksBaru[i] = xIsNext ? 'X' : 'O' ;

onPlay(kotaksBaru);

}

const pemenang = win(kotaks);

let status = ''

if (pemenang) {
  status = 'Kamu adalah Pemenang:' + pemenang
} else {
  status = 'Player Selanjutnya: ' + (xIsNext ? 'X' : 'O');
}

return (
<> 
 <div className="status"> {status} </div>
<div className="papan">
  <Kotak value={kotaks[0]} onKotakClick={() => handleClick(0)} />
  <Kotak value={kotaks[1]} onKotakClick={() => handleClick(1)}/>
  <Kotak value={kotaks[2]} onKotakClick={() => handleClick(2)}/>

  <Kotak value={kotaks[3]} onKotakClick={() => handleClick(3)}/>
  <Kotak value={kotaks[4]} onKotakClick={() => handleClick(4)}/>
  <Kotak value={kotaks[5]} onKotakClick={() => handleClick(5)}/>

  <Kotak value={kotaks[6]} onKotakClick={() => handleClick(6)}/>
  <Kotak value={kotaks[7]} onKotakClick={() => handleClick(7)}/>
  <Kotak value={kotaks[8]} onKotakClick={() => handleClick(8)}/>
</div>

</>
);
}

export default function game() {

const [xIsNext, setXIsNext] = useState(true);
const [history, setHistory] = useState([Array(9).fill(null)]);
const [pergerakan, setPergerakan] = useState(0);
const keadaanKotak = history[pergerakan];

function pergiKe(nextMove) {
  setPergerakan(nextMove);
  setXIsNext(nextMove % 2 === 0);
}

function handlePlay(kotaksBaru) {
const nextHistory = [...history.slice(0, pergerakan + 1), kotaksBaru];
  setHistory(nextHistory)
  setPergerakan(nextHistory.length -1)
  setXIsNext(!xIsNext);

}

const moves = history.map((kotaks, move) => {

  let jelaskan = '';

  if(move > 0) {
    jelaskan = 'Pergi ke #' + move;
  } else {
    jelaskan = 'Pergi ke Awal Permainan'
  }

  return (
    <li key={move}>
      <button onClick={() => pergiKe(move)}>{jelaskan}</button>
    </li>
  )
});


return (
  <> 
 <div className="game">
  <div className="papan-game">
  <Papan xIsNext={xIsNext} kotaks={keadaanKotak} onPlay={handlePlay} />
  </div>

   <div className="info-game">
   <ol>{moves}</ol>
   </div>
 </div>
  
  
  </>

)
}

function win(kotaks) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(kotaks[a] && kotaks[a] === kotaks[b] && kotaks[a] === kotaks[c]) {
    return kotaks[a];
    }

  }
  return false;
}