import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { RealContent } from "./components/Content";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <RealContent />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
