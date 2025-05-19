import "./App.css";
import HomePage from "./components/HomePage";

import { Route, Switch } from "react-router-dom";
import ShoppingList from "./components/ShoppingList";
export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/ShoppingList" component={ShoppingList} />
    </Switch>
  );
}
