import {config as AWSConfig} from 'aws-sdk';
import appConfig from '../config/app-config.json';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import {SingletonCognitoAuth} from './SingletonCognitoAuth';

AWSConfig.region = appConfig.region;

// Creates a CognitoUser instance
const createCognitoUser = () => {
    const pool = createCognitoUserPool();
    return pool.getCurrentUser();
};

// Creates a CognitoUserPool instance
const createCognitoUserPool = () => new CognitoUserPool({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId
});

// Get the URI of the hosted sign in screen
const getCognitoSignInUri = () => {
    const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}`;
    return signinUri;
};

// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = (href) => {
    return new Promise((resolve, reject) => {
        const auth = SingletonCognitoAuth.getInstance();

        // userHandler will trigger the promise
        auth.userhandler = {
            onSuccess: function (result) {
                resolve(result);
            },
            onFailure: function (err) {
                reject(new Error('Failure parsing Cognito web response: ' + err));
            }
        };
        auth.parseCognitoWebResponse(href);
    });
};

// Gets a new Cognito session. Returns a promise.
const getCognitoSession = () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = createCognitoUser();
        cognitoUser.getSession((err, result) => {
            if (err || !result) {
                reject(new Error('Failure getting Cognito session: ' + err));
                return;
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
                    email: result.idToken.payload.email,
                    name: result.idToken.payload.name,
                    picture: result.idToken.payload.picture
                }
            };
            resolve(session);
        });
    });
};

const cognitoLogin = () => {
    const auth = SingletonCognitoAuth.getInstance();
    auth.getSession();
};

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
    const auth = SingletonCognitoAuth.getInstance();
    auth.signOut();
};

export default {
    createCognitoUser,
    createCognitoUserPool,
    getCognitoSession,
    getCognitoSignInUri,
    parseCognitoWebResponse,
    signOutCognitoSession,
    cognitoLogin
};
