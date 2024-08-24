const funcHandler = (func: any) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };
};

export default funcHandler;
