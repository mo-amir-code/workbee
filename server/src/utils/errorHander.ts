import logger from "../../logger.js";

const funcHandler = (func: any) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (err) {
      logger.info(err);
      throw err; 
    }
  };
};

export default funcHandler;
