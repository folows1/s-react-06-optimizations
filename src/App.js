import React, { useState, useCallback, useMemo } from 'react';
import Button from './components/UI/Button/Button';
import DemoList from './components/Demo/DemoList';
import './App.css';
import DemoOutput from './components/Demo/DemoOutput';

function App() {

  console.log('APP RUNNING');


  const [show, setShow] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  const toggleHandler = useCallback(() => {
    if (allowToggle) {
      setShow((prevShow) => !prevShow);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <DemoOutput show={show} />
      {/* DemoOutput is a component that is wrapped in React.memo() 
      and it will only re-render if the props change. 
      If the props don't change, it will not re-render. 
      This is a performance optimization. */}
      <Button onClick={toggleHandler}>Toggle</Button>
      {/* Button is a component that is not wrapped in React.memo() and it will re-render every time the parent component re-renders. */}
      { /* Even with the React.memo() wrapping Button, it will still re-render because the parent component re-renders.
      When the function toggleHandler() is re-created, it will cause the Button component to re-render.
      This is because the function toggleHandler() is a new function every time the parent component re-renders. 
      This is a performance optimization.
      The useCallback() hook will prevent the function toggleHandler() from being re-created every time the parent component re-renders.
      The useCallback() hook will only re-create the function toggleHandler() if the dependencies change.
      */
        <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      }
    </div>
  );
}

export default App;
