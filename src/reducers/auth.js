import * as types from "../actions/types";
import appConfig from "../config/app-config";
import {CognitoAuth} from "amazon-cognito-auth-js";


const initialAuth = {
    authenticated: false,
    authLoading: false,
    cognitoAuth: {},
    session: {}
};


const authReducer = (state = initialAuth, action) => {
    switch (action.type) {
        case types.CREATE_COGNITO_AUTH:
            const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '');
            // We need the Object.create, because we want to create a copy, and not a full reference, to make it
            // different on redux logger on prev and next state.
            const newState = JSON.parse(JSON.stringify(state));
            newState.cognitoAuth = new CognitoAuth({
                UserPoolId: appConfig.userPool,
                ClientId: appConfig.clientId,
                AppWebDomain: appWebDomain,
                TokenScopesArray: appConfig.tokenScopes,
                RedirectUriSignIn: appConfig.callbackUri,
                RedirectUriSignOut: appConfig.signoutUri,
                IdentityProvider: 'COGNITO',
                AdvancedSecurityDataCollectionFlag: false
            });


            newState.cognitoAuth.userhandler = {
                onSuccess: session => {
                    console.log('AEEEEEE');
                },
                onFailure: error => {
                    console.log('Error: ' + error);
                    this.session = undefined;
                }
            };

            return newState;
            break;

        case types.LOGIN:
            state.cognitoAuth.getSession();
            return state;
            break;


        default:
            return state;


    }
};


export default authReducer;
