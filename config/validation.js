const Joi = require('joi');

const DEFAULT_SCHEMA_OBJECT = {};

const createParamsObject = (req) => ({
  query: { ...req.query },
  params: { ...req.params },
  body: { ...req.body },
});

/**
 * Check if passed data match requirements
 * @param schema
 * @returns {function(...[*]=)}
 */
module.exports = (schema, redirectUrl = '') => (req, res, next) => {
  const mixedSchema = Joi.object({ ...DEFAULT_SCHEMA_OBJECT, ...schema }).unknown();
  const params = createParamsObject(req);
  const result = mixedSchema.validate(params);

  if (result.error) {
    // eslint-disable-next-line no-console
    console.warn(`Blocked request. ${result.error}`);
    if (redirectUrl.length > 0) {
      return res.redirect(redirectUrl);
    }
    return res.status(400).json({
      error: true,
      msg: `${result.error}`,
    });
  }
  return next();
};
