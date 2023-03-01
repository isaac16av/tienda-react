import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Cart from './pages/Cart';
import List from './pages/List';

function App() {
  return (
    <HashRouter>
      <div>
        <Header />

        <div className='content'>
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/' component={List} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
