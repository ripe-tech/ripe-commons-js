import fp from "fastify-plugin";

import { getRipeAuth } from "../../auth";

export const aclFastify =
    (options = {}) =>
    (req, res, next) => {
        req.getAcl = async ctx => {
            req.ripeCtx = req.ripeCtx === undefined ? {} : req.ripeCtx;
            if (options.skipAuth) {
                req.ripeCtx.user = options.skipUser || "anonymous";
                return options.skipAcl || ["*"];
            }
            const auth = await getRipeAuth(req);
            req.ripeCtx.user = auth.account.username;
            return auth.acl.acl;
        };

        next();
    };

export const acl = aclFastify;

export const aclPlugin = async (app, options) => {
    app.addHook("onRequest", acl(options));
};

export const ripeAcl = fp(aclPlugin);
