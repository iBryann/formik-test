import React from 'react';;
import ReactDOM from 'react-dom/client';

import './styles/global.css';
import Simple from './pages/Simple';
import MaterialUI from './pages/MaterialUI';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MaterialUI />
    </React.StrictMode>
);
