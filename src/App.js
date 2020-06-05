import React from 'react';
import { HashRouter, Route } from 'react-router-dom'

import RootView from './views/RootView'
import './styles/index.css';

function App() {
  return (
    <HashRouter>
      <Route path="/" component={RootView}></Route>
    </HashRouter>
  );
}

export default App;
