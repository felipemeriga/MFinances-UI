

export const DEFAULT_ENV = 'test';

export const ENVIRONMENT = process.env.ENVIRONMENT || DEFAULT_ENV;

export const DEV_SESSION = {
    "user": {
        "userName": "dev",
        "email": "dev",
        "name": "dev"
    },
    "credentials": {
        "idToken": "123",
        "accessToken": "123"
    }
};
