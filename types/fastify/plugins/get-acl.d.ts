import {
    FastifyInstance,
    FastifyPluginOptions,
    RawRequestDefaultExpression,
    RawServerBase,
    RawServerDefault,
    RawReplyDefaultExpression
} from "fastify";

export declare function getAcl<
    Options extends FastifyPluginOptions = Record<never, never>,
    Server extends RawServerBase = RawServerDefault
>(
    instance: FastifyInstance<
        Server,
        RawRequestDefaultExpression<Server>,
        RawReplyDefaultExpression<Server>
    >,
    opts: Options,
    next: (err?: Error) => void
): void;
