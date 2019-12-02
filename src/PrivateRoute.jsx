
import React from "react";
import {inject, observer} from "mobx-react";
import {Route} from "react-router-dom";

@inject("authStore")
@observer
class PrivateRoute extends React.Component {

    componentWillMount(): void {
        const urlString = window.location.href
        var url = new URL(urlString);
        if(url.hash !== "" && url.hash.includes("access_token") && !this.props.authStore.isUserAuthenticated()) {
            this.props.authStore.parseCognitoWebResponse(window.location.href);
        }
    }

    // User this function for testing purposes only, to delete the session
    signOutForTest(){
       this.props.authStore.signOut();
    }

    render() {
        //this.signOutForTest();
        const {component: Component, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.props.authStore.isUserAuthenticated() ? (
                        <Component {...props} />
                    ) : (
                        this.props.authStore.authLoading ? (
                            <div>Loading...</div>
                        ) : (
                            this.props.authStore.login()
                        )
                    )
                }
            />
        )
    }


}

export default PrivateRoute;