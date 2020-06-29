import appConfig from "../config/app-config";
import {CognitoAuth} from 'amazon-cognito-auth-js';

// http://github.com/arronharden/cognito-demo-ui/blob/master/src/routes/Home.js
// This represents a singleton object of the CognitoAuth, after it's initialized with the proper
// Cognito User Pools Arguments, for the attribute TokenScopesArray, it's important to put an array with all
// those values (["phone", "email", "profile","openid", "aws.cognito.signin.user.admin"]) if you are using both
// Cognito and Federation. If you forget to put them, the idToken from response will not be filled.
export class SingletonCognitoAuth {

    static instance = null;
    static createInstance() {

        const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '');
        return new CognitoAuth({
            UserPoolId: appConfig.userPool,
            ClientId: appConfig.clientId,
            AppWebDomain: appWebDomain,
            responseType: appConfig.responseType,
            TokenScopesArray: appConfig.tokenScopes,
            RedirectUriSignIn: appConfig.callbackUri,
            RedirectUriSignOut: appConfig.signoutUri
        });
    }

    static getInstance () {
        if (!SingletonCognitoAuth.instance) {
            SingletonCognitoAuth.instance = SingletonCognitoAuth.createInstance();
        }
        return SingletonCognitoAuth.instance;
    }
}
