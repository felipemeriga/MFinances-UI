
import React from "react";
import {inject, observer} from "mobx-react";
import {Route} from "react-router-dom";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as appActions from "./actions";
import cognitoUtils from "./auth/cognitoUtils";
import {DEV_SESSION, ENVIRONMENT} from "./constants/constants";


class PrivateRoute extends React.Component {

    // User this function for testing purposes only, to delete the session
    signOutForTest(){
        cognitoUtils.signOutCognitoSession();
    }

    checkUserLoggedInLocalStorage = () => {
        // If the current environment it's development, there is no need for having a cognito login
        if (ENVIRONMENT === 'development') {
            this.props.setSession(DEV_SESSION);
        } else {
            cognitoUtils.getCognitoSession().then(
                (result => {
                    this.props.setSession(result);
                })
            ).catch(
                (error => {
                    cognitoUtils.cognitoLogin();
                }));
        }
        return (
            <>
            </>
        );
    };

    render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.props.session.isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        this.checkUserLoggedInLocalStorage()
                    )
                }
            />
        );
    }


}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSession: bindActionCreators(appActions.actions.setSession, dispatch),
        initSessionFromCallbackURI: bindActionCreators(appActions.actions.initSessionFromCallbackURI, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

PrivateRoute.defaultProps = {
};

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    session: PropTypes.object,
    initSessionFromCallbackURI: PropTypes.func,
    setSession: PropTypes.func
};
