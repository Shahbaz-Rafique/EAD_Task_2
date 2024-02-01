import './App.css';
import {Switch,Route} from 'react-router-dom';
import Main from './Components/main';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
