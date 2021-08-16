import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NoMatch from "./Components/NoMatch";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import Story from "./Components/Story";

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );

    const setLogin = (value) => {
        setLoggedIn(value);
    };

    return (
        <React.Fragment>
            <NavigationBar isLoggedIn={isLoggedIn} />
            <Router clasName="main-body">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route
                        path="/login"
                        render={(routeProps) => (
                            <Login
                                setLogin={(value) => setLogin(value)}
                                routeProps={routeProps}
                            />
                        )}
                    />
                    <Route
                        path="/signup"
                        render={(routeProps) => (
                            <Signup
                                setLogin={(value) => setLogin(value)}
                                routeProps={routeProps}
                            />
                        )}
                    />
                    <Route
                        path="/profile"
                        render={(routeProps) => (
                            <Profile
                                setLogin={(value) => setLogin(value)}
                                routeProps={routeProps}
                            />
                        )}
                    />
                    <Route
                        path="/story/:email"
                        render={(routeProps) => (
                            <Story routeProps={routeProps} />
                        )}
                    />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
            <Footer />
        </React.Fragment>
    );
};

export default App;
