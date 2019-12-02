
import {action, observable} from "mobx";
import {CognitoAuth} from 'amazon-cognito-auth-js';
import appConfig from "../config/app-config.json"
import { CognitoUserPool } from 'amazon-cognito-identity-js'

class AuthStore {
    @observable authenticated: boolean = true;
    @observable authLoading: boolean = false;
    cognitoAuth;
    session;


    constructor(props) {
        this.createCognitoAuth();
    }

    // Creates a CognitoUserPool instance
    createCognitoUserPool() {
        return new CognitoUserPool({
        UserPoolId: appConfig.userPool,
        ClientId: appConfig.clientId})
    }

    @action
    getUserInfoSession() {
        this.authLoading = true;
        const pool = this.createCognitoUserPool();
        const currentUser = pool.getCurrentUser();
        if(currentUser == null) {
            this.authLoading = false;
            return
        }
        currentUser.getSession((err, result) => {
            if (err || !result) {
                console.log('Failure getting Cognito session: ' + err);
            }

            // Resolve the promise with the session credentials
            console.debug('Successfully got session: ' + JSON.stringify(result));
            const session = {
                credentials: {
                    accessToken: result.accessToken.jwtToken,
                    idToken: result.idToken.jwtToken,
                    refreshToken: result.refreshToken.token
                },
                user: {
                    userName: result.idToken.payload['cognito:username'],
                    email: result.idToken.payload.email
                }
            };
           this.session = session;
            this.authLoading = false;
        })
    }


    parseCognitoWebResponse(href) {
        this.cognitoAuth.parseCognitoWebResponse(href);
        this.getUserInfoSession();
    }

    @action
    createCognitoAuth() {
        const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '');
        this.cognitoAuth = new CognitoAuth({
            UserPoolId: appConfig.userPool,
            ClientId: appConfig.clientId,
            AppWebDomain: appWebDomain,
            TokenScopesArray: appConfig.tokenScopes,
            RedirectUriSignIn: appConfig.callbackUri,
            RedirectUriSignOut: appConfig.signoutUri,
            IdentityProvider: 'COGNITO',
            AdvancedSecurityDataCollectionFlag: false
        });

        this.cognitoAuth.userhandler = {
            onSuccess: session => {
                this.getUserInfoSession();
            },
            onFailure: error => {
                console.log('Error: ' + error);
                this.session = undefined;
            }
        };
    }

    login() {
        this.cognitoAuth.getSession();
    }

    signOut() {
        this.session = undefined;
        this.cognitoAuth.signOut();
    }

    isUserAuthenticated() {
        return this.cognitoAuth.isUserSignedIn();
    }



}

export default new AuthStore();