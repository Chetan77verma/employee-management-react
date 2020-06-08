import React from "react";
import "./App.css";
import Login from "./components/user-management/login";
import Employee from "./components/employee/EmployeeList";
import EmployeeCreateEdit from "./components/employee/EmployeeCreateEdit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/employee" exact component={Employee}></Route>

          <Route
            path="/employee/create"
            exact
            component={EmployeeCreateEdit}
          ></Route>
          <Route
            path="/employee/edit/:id"
            exact
            component={EmployeeCreateEdit}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
