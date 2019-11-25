
import React from "react";
import {inject, observer} from "mobx-react";
import {Route, Redirect, Switch} from "react-router-dom";
import AdminLayout from "./layouts/Admin";

@inject("authStore")
@observer
class PrivateRoute extends React.Component {

    createCognitoAuth(){
        this.props.authStore.login();
    }

    render() {
       this.createCognitoAuth();
        const {component: Component, ...rest} = this.props;
        console.log("rendering");
        return (
            <Route
                {...rest}
                render={props =>
                    this.props.authStore.authenticated ? (
                        <Switch>
                            <Route path="/admin" render={props => <AdminLayout {...props} />} />
                            <Redirect from="/" to="/admin/index" />
                        </Switch>
                    ) : (
                        this.props.authStore.authLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <Redirect to={{pathname: '/auth/login', state: {from: this.props.location}}}/>
                        )
                    )
                }
            />
        )
    }


}

export default PrivateRoute;