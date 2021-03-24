import {
    FastifyInstance,
    FastifyPluginOptions,
    RawRequestDefaultExpression,
    RawServerBase,
    RawServerDefault,
    RawReplyDefaultExpression,
    FastifyRequest,
    FastifyReply,
    HookHandlerDoneFunction,
    preValidationHookHandler
} from "fastify";

type Options = FastifyPluginOptions & {
    skipAuth?: boolean;
    skipUser?: string;
    skipAcl?: string[];
};

export declare function acl(
    options?: Options
): (
    req: FastifyRequest,
    res: FastifyReply,
    next: HookHandlerDoneFunction
) => preValidationHookHandler | void;

export declare function ripeAcl<Server extends RawServerBase = RawServerDefault>(
    instance: FastifyInstance<
        Server,
        RawRequestDefaultExpression<Server>,
        RawReplyDefaultExpression<Server>
    >,
    opts: Options,
    next: (err?: Error) => void
): void;
