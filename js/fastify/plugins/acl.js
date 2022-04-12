import fp from "fastify-plugin";

import { acl } from "../../acl";

const aclPlugin = async (app, options) => {
    app.addHook("onRequest", acl(options));
};

export const ripeAcl = fp(aclPlugin);
