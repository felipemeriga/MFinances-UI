import React from "react";
import {inject, observer} from "mobx-react";


@inject("authStore")
@observer
class ReturnLogin extends React.Component {

    parseCallbackContent(){
        this.props.authStore.parseCognitoWebResponse(window.location.href);
    }

    render() {
        this.parseCallbackContent();
        return (
        <div>Loading...</div>
        )
    }
}

export default ReturnLogin;