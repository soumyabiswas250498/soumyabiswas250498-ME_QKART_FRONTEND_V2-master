import Register from './components/Register';
import ipConfig from './ipConfig.json';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Checkout from './components/Checkout';
import Thanks from './components/Thanks';
import Protected from './components/Protected';
import NotFound from './components/NotFound';

export const config = {
  endpoint: `https://qkrt-frontend.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/login">
          <Protected>
            <Login />
          </Protected>
        </Route>
        <Route exact path="/register">
          <Protected>
            <Register />
          </Protected>
        </Route>
        <Route exact path="/checkout">
          <Protected>
            <Checkout />
          </Protected>
        </Route>
        <Route exact path="/thanks">
          <Protected>
            <Thanks />
          </Protected>
        </Route>
        <Route exact path="/*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
