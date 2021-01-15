import fp from "fastify-plugin";

import { getRipeAuth } from "../../auth";

const acl = async (app, options) => {
    app.addHook("onRequest", (req, res, next) => {
        req.getAcl = async ctx => {
            if (options.skipAuth) {
                req.ripeCtx.user = "anonymous";
                return ["*"];
            }
            const auth = await getRipeAuth(req);
            req.ripeCtx.user = auth.account.username;
            return auth.acl.acl;
        };

        next();
    });
};

export const ripeAcl = fp(acl);
