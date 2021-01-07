import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const ReactRoot = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(
  <ReactRoot/>,
  document.getElementById('root')
);
