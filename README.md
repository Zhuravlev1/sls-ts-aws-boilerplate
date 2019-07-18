# backend

Built with [Serverless framework](https://serverless.com/framework/docs/)

Before deployment the following ENV variables have to be configured:
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

## Deploy to DEV env

```bash
npm run deploy:backend -- -s dev
```

Get deployment info including keys

`sls info -s dev --verbose`

To invoke lambda function

```bash
sls invoke local -f functionName
sls invoke -f functionName -s dev
```

To deploy only one lambda function
`sls deploy function -f functionName --stage dev --region us-east-1`

View lambda function logs
`sls logs -f functionName -t`

## Tests

How to run API and unit tests
* Make a copy of .env.example and rename to .env
* Insert your AWS credentials in .env
* Use `npm run test:api` to run the API test
* Use `npm test` to run the unit tests

## Deploy with Docker

Before deployment update credentials in docker.env
```bash
cp docker.env.example docker.env
bin/dckr build
# deploy stack
bin/dckr npm run deploy:backend -- -s stageName
# deploy a single function
bin/dckr sls deploy function -f funcName --stage stageName --region us-east-1
```

## Package.json scripts

* `test` — run unit tests
* `test:api` — run API tests
* `precommit` — husky precommit hook configuration
* `check-types` — check Typescript typings
* `check-velocity` — check velocity template syntax
* `lint` — lint typescript code
* `format` — format typescript code
* `lint-schema` — check graphql schema
* `lint-yaml` — validate yaml syntax
* `deploy:backend` — deploy xxx-backend: configures Gateway and Cognito
