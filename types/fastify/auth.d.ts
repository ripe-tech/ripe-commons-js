import {
    FastifyRequest,
    FastifyReply,
    HookHandlerDoneFunction,
    preValidationHookHandler
} from "fastify";

export type verifyKeyFastifyOptions = { headerKey?: string };

export declare function verifyKeyFastify(
    key?: string,
    options?: verifyKeyFastifyOptions
): (
    req: FastifyRequest,
    res: FastifyReply,
    next: HookHandlerDoneFunction
) => preValidationHookHandler | void;
