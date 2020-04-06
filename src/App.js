import React from 'react';
import { Route } from 'react-router-dom';
import Index from './Components/index';

function App() {
  return (
    <>
      <Route path="/" component={Index} />
    </>
    
  );
};

export default App;
