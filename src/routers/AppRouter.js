import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { AuthContext } from "../auth/AuthContext";

export const AppRouter = () => {

    const { user } = useContext( AuthContext );

    return (
        <Router>
            <div>

                <Switch>
                    
                    <PublicRoute
                        exact
                        isAuthenticated={ user.logged }
                        path="/login" 
                        component={ LoginScreen } 
                    />
                    <PrivateRoute
                        isAuthenticated={ user.logged } 
                        path="/" 
                        component={ DashboardRoutes }  
                    />
                </Switch>

            </div>
        </Router>
    )
}
