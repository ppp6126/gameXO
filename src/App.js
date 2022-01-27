import './App.css';
import Game from "./components/game";
import LoadGame from "./components/LoadGame";
import { Route , Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/loadgame/:gid" component={LoadGame} />
        <Route path="/:id"><p>Error</p></Route>
      </Switch>
    </div>
  );
}

export default App;
