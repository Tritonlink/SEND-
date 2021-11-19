import React from 'react';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {increment, decrement} from "./features/counter"

function App() {
  const count = useAppSelector<number>((state) => state.counter.value)
  const dispatch = useAppDispatch()
  console.log(count)
  return (
    <div>
      <h1>Hh{count}</h1>
      <button onClick={() => dispatch(increment())}></button>
    </div>
  );
}

export default App;
