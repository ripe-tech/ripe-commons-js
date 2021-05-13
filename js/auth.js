import { OperationalError } from "yonius";
import { API } from "ripe-id-api";

/**
 * Tries to obtain a RIPE authorization object (username and ACL)
 * for the current request context, using the (redeem) token in context
 * as the basis for the retrieval of the authorization.
 *
 * In case the process fails an exception is raised indicating the source
 * of such problem.
 *
 * @param {Request} req The request object that is going to be used
 * as the context provided and from which the (redeem) token is going
 * to be retrieved and the authorization stored.
 * @returns The resulting RIPE authorization object for the current
 * context, exception is raised in case it's not possible to redeem one.
 */
export const getRipeAuth = async req => {
    // checks the current request's cache to check if there's
    // an authorization information already present in it
    if (req.ripeAuth) return req.ripeAuth;

    // allocates space for the (redeem) token value that is going
    // to be "gathered" from all possible request sources
    let token = null;

    // tries to "find" the token in the route parameters
    if (req.params.token) token = req.params.token;

    // tries to "find" the token in the GET parameters
    if (req.query.token) token = req.query.token;

    // tries to verify if the authorization header is present and
    // if that's the case unpacks the token from it
    if (req.headers.authorization) {
        [, token] = req.headers.authorization.split(" ", 2);
    }

    // in case no redeem token has been found on request must throw an error
    // indicating such issue (as expected)
    if (!token) {
        throw new OperationalError("No (redeem) token available", 401);
    }

    // creates a new instance of the RIPE ID API client to be used for
    // the "redeem" operation of the redeem token
    const api = new API();

    // tries to redeem the token and then reacts to the most usual problems
    // in the expected manner, the redeem operation represents the guarantee
    // that the 3rd party who provided this token has effectively access to the
    // ACL and username that is provided as part of the resulting authorization
    const auth = await api.redeemToken(token);
    if (auth.code === 404) {
        throw new OperationalError("Token not found", 401);
    }

    // stores the (redeem) token associated with the request in the request itself
    // so that it can be easily retrieved latter if needed (no need to find the
    // token among the multiple possible locations of it: GET, POST params)
    auth.token = token;

    // updates the current request with the authorization information
    // retrieved from the provided token (avoids new calls, it's a cache)
    req.ripeAuth = auth;
    return req.ripeAuth;
};

export default getRipeAuth;
