import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import GroceryList from "./GroceryList"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <Router>
          <Switch>
            <Route path={`/:groceryListId?`} component={GroceryList}>
            </Route>
          </Switch>
          </Router>
        </Container>
      </header>
    </div>
  );
}

export default App;
