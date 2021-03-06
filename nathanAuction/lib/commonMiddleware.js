import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

// creating shorthand to export around

export default handler => middy(handler)
  .use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler()
  ])