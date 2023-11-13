import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './pages/landing/LadingPage';
import LoginSignup from './pages/sign/LoginSignup';
import MainPage from './pages/main/MainPage';
import CurrentLocation from './pages/nearby/CurrentLocation';
import MarkerPage from './pages/marker/MarkerPage';
import Wish from './pages/wishlist/Wish';
import ChoizaPage from './pages/choizeRoad/ChoizaPage';
import MyInfo from './pages/myInfo/MyInfo';
import Auth from './context/auth';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Auth(<LandingPage />, null)} />
        <Route exact path='/loginSignup' component={Auth(<LoginSignup />, false)} />
        <Route exact path='/main' component={Auth(<MainPage />, true)} />
        <Route exact path='/current-location' component={Auth(<CurrentLocation />, true)} />
        <Route exact path='/marker' component={Auth(<MarkerPage />, true)} />
        <Route exact path='/wish' component={Auth(<Wish />, true)} />
        <Route exact path='/my-info' component={Auth(<MyInfo />, true)} />
        <Route exact path='/choizaroad' component={Auth(<ChoizaPage />, true)} />
      </Switch>
    </Router>
  );
}

export default App;
