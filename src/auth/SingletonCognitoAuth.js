import appConfig from "../config/app-config";
import {CognitoAuth} from 'amazon-cognito-auth-js';

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
