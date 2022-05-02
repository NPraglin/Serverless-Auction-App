import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import commonMiddleware from './lib/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createAuction = async (event, context) => {
  const { title } = event.body;
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    highestBid: {
      amount: 0
    }
  };

  try {
    await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }).promise();
  } catch (err) {
    console.log('error putting to dynamo table', err)
    throw new createError.InternalServerError(err);
  }
  

  return {
    statusCode: 201, // resource created
    body: JSON.stringify(auction),
  };
};

export const handler = commonMiddleware(createAuction)