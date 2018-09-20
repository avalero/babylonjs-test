import * as React from 'react';
import './App.css';

import ThreedViewer from './components/ThreedViewer';

class App extends React.Component {
  public render() {
    return (
      <div className="App" >
        <ThreedViewer />
      </div>
    );
  }
} 

export default App;
