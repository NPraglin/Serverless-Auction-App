# Serverless-Auction-App
Auction application to practice serverless framework integration

## Notes
AWS yaml to configure backend and set events to trigger Lambda

### Plugins
- serverless-webpack: Allows you to bundle app/compile JS
- serverless-domain-manager: Allowss easier creation of domains/assignment
- serverless-offline: Allows you to run AWS Lambda functions offline
- serverless-typescript: Allows integration of Typescript support

### AWS CloudFormation
- Deployment of applications/stacks

### MicroService Architecture
- Reduces dependancy and allows for independant scaling per service/independant updating
#### Example: using API Gateways for the following
- Stock
- Catalog
- Notifications
- Orders
- Authorization
- Live Chat

### Templates
- sls create aws-node-js to launch a new sls project