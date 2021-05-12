import { OperationalError } from "yonius";
import { API } from "ripe-id-api";

export const getRipeAuth = async req => {
    // checks the current request's cache to check if there's
    // an authorization information already present in it
    if (req.ripeAuth) return req.ripeAuth;

    // allocates space for the access token value that is going
    // to be "gathered" from all possible request sources
    let accessToken = null;

    // tries to "find" the token in the route parameters
    if (req.params.token) accessToken = req.params.token;

    // tries to "find" the token in the GET parameters
    if (req.query.token) accessToken = req.query.token;

    // tries to verify if the authorization header is present and
    // if that's the case unpacks the token from it
    if (req.headers.authorization) {
        [, accessToken] = req.headers.authorization.split(" ", 2);
    }

    // in case no access token has been found on request must throw an error
    // indicating such issue (as expected)
    if (!accessToken) {
        throw new OperationalError("No access token provided", 401);
    }

    // creates a new instance of the RIPE ID API client to be used for
    // the "redeem" operation of the access token
    const api = new API();

    // tries to redeem the token and then reacts to the most usual problems
    // in the expected manner
    const auth = await api.redeemToken(accessToken);
    if (auth.code === 404) {
        throw new OperationalError("Token not found", 401);
    }
    auth.token = accessToken;

    // updates the current request with the authorization information
    // retrieved from the provided token (avoids new calls, it's a cache)
    req.ripeAuth = auth;
    return req.ripeAuth;
};

export default getRipeAuth;
