import React from 'react';
import './App.css';
import i18n from './locale/i18n';
import Container from '@material-ui/core/Container';
import GroceryList from "./GroceryList"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { initReactI18next } from 'react-i18next';
i18n.use(initReactI18next).init({
  fallbackLng: 'en',

  // have a common namespace used around the full app
/*   ns: ['translations'],
  defaultNS: 'translations', */

  debug: true,


  react: {
    wait: true,
  },
});
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
