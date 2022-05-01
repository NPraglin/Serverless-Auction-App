import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import commonMiddleware from './lib/commonMiddleware'
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuctions = async (event, context) => {
  let auctions;

  try {
    // dynamo syntax to GET the data
    const result = await dynamodb.scan({ TableName: process.env.AUCTIONS_TABLE_NAME }).promise();
    // assign to the let variable
    auctions = result.Items;
  } catch (err) {
    console.log('error getting auctions', err);
    throw new createError.InternalServerError(err);
  }

  return {
    statusCode: 200, // resource created
    body: JSON.stringify(auctions),
  };
};

export const handler = commonMiddleware(getAuctions);