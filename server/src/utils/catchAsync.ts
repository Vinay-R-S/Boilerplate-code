import { FastifyReply, FastifyRequest } from 'fastify';

type AsyncHandler = (req: FastifyRequest, reply: FastifyReply) => Promise<void>;

/**
 * In Fastify, async route handlers natively forward unhandled rejections to
 * the global error handler. This wrapper is kept for structural parity and
 * acts as a transparent passthrough.
 */
const catchAsync = (fn: AsyncHandler): AsyncHandler => fn;

export default catchAsync;
