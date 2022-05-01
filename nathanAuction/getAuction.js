import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import commonMiddleware from './lib/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getAuction = async (event, context) => {
  let auction;

  // get query params that are defined in yml route
  const { id } = event.pathParameters;

  try {
    // dynamo syntax to GET the data by QUERY
    const result = await dynamodb.get({ TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id } 
  }).promise();
    // assign to the let variable
    auction = result.Item; // single item
  } catch (err) {
    console.log('error getting by id', err);
    throw new createError.InternalServerError(err);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ${id} not found.`)
  }

  return {
    statusCode: 200, // resource created
    body: JSON.stringify(auction),
  };
};

export const handler = commonMiddleware(getAuction)