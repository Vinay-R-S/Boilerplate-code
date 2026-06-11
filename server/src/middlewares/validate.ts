import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { ZodTypeAny } from 'zod';

type ValidationTarget = 'body' | 'params' | 'query';

interface ValidationSchema {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

const getTarget = (req: FastifyRequest, target: ValidationTarget): unknown => {
  if (target === 'body') return req.body;
  if (target === 'params') return req.params;
  return req.query;
};

const setTarget = (req: FastifyRequest, target: ValidationTarget, value: unknown): void => {
  if (target === 'body') (req as { body: unknown }).body = value;
  else if (target === 'params') (req as { params: unknown }).params = value;
  else (req as { query: unknown }).query = value;
};

/**
 * Runs Zod schemas against body, params, and/or query and returns 422 if any fail.
 * Usage: { preHandler: validate({ body: mySchema }) }
 */
export const validate = (schema: ValidationSchema) =>
  async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const errors: { field: string; message: string }[] = [];

    const entries = Object.entries(schema) as [ValidationTarget, ZodTypeAny][];
    for (const [target, zodSchema] of entries) {
      const result = zodSchema.safeParse(getTarget(req, target));
      if (!result.success) {
        result.error.errors.forEach((e) => {
          errors.push({ field: e.path.join('.'), message: e.message });
        });
      } else {
        setTarget(req, target, result.data);
      }
    }

    if (errors.length > 0) {
      await reply.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
