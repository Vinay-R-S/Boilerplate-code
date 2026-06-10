import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

/**
 * Runs an array of validation chains and returns 422 if any fail.
 * Usage: router.post('/route', validate([body('email').isEmail()]), handler)
 */
export const validate = (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((v) => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    next();
  };
