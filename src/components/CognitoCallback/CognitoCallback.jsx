import React from "react";
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router-dom';
import * as appActions from "../../actions";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import ReactLoading from "react-loading";


class CognitoCallback extends React.Component {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount(): void {
        if (this.props.location.hash || this.props.location.search) {
            this.props.initSessionFromCallbackURI({
                    callbackHref: window.location.href
                }
            );
        }
    }


    render() {
        if ((!this.props.location.hash && !this.props.location.search) || this.props.session.isLoggedIn) {
            return <Redirect to="/" />;
        }
        else {
            return (

                <div className={'container-flex bg-gradient-info'}>
                    <ReactLoading color={'#456de3'} type={'spinningBubbles'} height={'15%'} width={'15%'}/>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initSessionFromCallbackURI: bindActionCreators(appActions.actions.initSessionFromCallbackURI, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CognitoCallback);

CognitoCallback.defaultProps = {
};

CognitoCallback.propTypes = {
    location: PropTypes.object,
    session: PropTypes.object,
    initSessionFromCallbackURI: PropTypes.func
};

