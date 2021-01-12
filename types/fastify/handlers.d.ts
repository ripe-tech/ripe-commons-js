import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export declare function errorHandlerFastify(
    err: FastifyError,
    req: FastifyRequest,
    res: FastifyReply
): void;
export declare function notFoundHandlerFastify(req: FastifyRequest, res: FastifyReply): void;
