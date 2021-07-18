import {Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import {Users} from './pages/Users';
import {Details} from './pages/Details';
import {Reports} from './pages/Reports';


import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Login}/>
                <PrivateRoute path='/' exact component={Home}/>
                <PrivateRoute path='/usuarios' exact component={Users}/>
                <PrivateRoute path='/detalhes/:id' component={Details}/>
                <PrivateRoute path='/relatorios' component={Reports}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
