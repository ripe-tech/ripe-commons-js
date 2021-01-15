import fp from "fastify-plugin";

import { getRipeAuth } from "../../auth";

const acl = async (app, options) => {
    app.addHook("onRequest", (req, res, next) => {
        req.getAcl = async ctx => {
            req.ripeCtx = {};
            if (options.skipAuth) {
                req.ripeCtx.user = options.skipUser || "anonymous";
                return options.skipAcl || ["*"];
            }
            const auth = await getRipeAuth(req);
            req.ripeCtx.user = auth.account.username;
            return auth.acl.acl;
        };

        next();
    });
};

export const ripeAcl = fp(acl);
