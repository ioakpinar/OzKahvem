import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import OrderCompleted from "./pages/OrderCompleted";
import { TimeProvider } from "./contexts/TimeContext";

function App() {
  return (
    <>
      {/* react-router-dom */}
      {/* Sayfalar arası linkleme işlemi */}
      <Router>
        <Switch>
          {/* path kullanarak url'mizi belirliyoruz */}
          {/* component kullanarak sayfanın yüklemesi gereken componenti çağırıyoruz */}
          <Route path="/" component={Home} exact />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <TimeProvider>
            <Route path="/order-completed" component={OrderCompleted} />
          </TimeProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
