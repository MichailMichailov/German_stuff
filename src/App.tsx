import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { RealContent } from "./components/Content";
import { PersistGate } from 'redux-persist/integration/react';
import { Preload } from './components/common/preload/preload';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Preload/>} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <RealContent />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
