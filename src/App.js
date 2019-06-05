import React from 'react';
import Header from './components/shared/Header';
import Lista from './components/Lista';
import Carrito from './components/Carrito';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="Lista">
                <Header />

                <div className='contenido'>
                    <Route exact path='/' component={Lista} />
                    <Route exact path='/carrito' component={Carrito} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;