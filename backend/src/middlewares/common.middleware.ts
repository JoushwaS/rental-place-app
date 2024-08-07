import { sendErrorResponse } from "../utils/response";
import { ValidateMiddlewareParamType } from "../types/middlewareTypes";
import { NextFunction, Response } from "express";
import logger from "../utils/logger";
import { verifyJWT } from "../utils/helpers";
import { CustomRequest } from "../types";

export const validateRequest = ({
  req,
  res,
  next,
  schema,
}: ValidateMiddlewareParamType) => {
  if (Object.keys(req.body).length === 0)
    sendErrorResponse({
      res,
      error: "Request body cannot be empty",
      statusCode: 404,
    });
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    logger.error(
      `Error while validating schema ==> ${JSON.stringify(error.message)}`
    );
    sendErrorResponse({
      res,
      error: error.details.map((x) => x.message.replace(/['"]/g, ""))[0],
      statusCode: 400,
    });
  } else {
    req.body = value;
    next();
  }
};

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("You are not authorized to perform this action");
    }
    const decode = verifyJWT(token);
    req["reqUser"] = decode;
    next();
  } catch (error) {
    logger.error(
      `Unauthorized user trying to access the route ==> ${JSON.stringify(
        error.message
      )}`
    );
    sendErrorResponse({
      res,
      error: error.message,
      statusCode: 401,
    });
  }
};

export const verifyRecaptcha = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.body.recaptcha_response;
    if (!token) {
      throw new Error("Recaptcha token is required");
    }

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

    fetch(url, { method: "POST" })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success && google_response.score > 0.5) {
          return next(); // Recaptcha passed
        }
        sendErrorResponse({
          res,
          error: "Recaptcha verification failed",
          statusCode: 400,
        });
      })
      .catch((error) => {
        logger.error(
          `Error while verifying recaptcha ==> ${JSON.stringify(error.message)}`
        );
        sendErrorResponse({
          res,
          error: error.message,
          statusCode: 400,
        });
      });
  } catch (error) {
    logger.error(
      `Error while verifying recaptcha ==> ${JSON.stringify(error.message)}`
    );
    sendErrorResponse({
      res,
      error: error.message,
      statusCode: 400,
    });
  }
};
