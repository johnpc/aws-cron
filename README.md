# What is this repo:

This repo contains AWS cdk scripts to deploy a cron job that runs in a lambda.

## Prerequisites

1.  Install the AWS sdk

```
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

3.  Set up your .env file with contents like this:

```
LAMBDA_NAME=MyLambdaCron
LAMBDA_FREQUENCY="cron(0 18 ? * MON-THU *)"
TEST_ENV=testing123
```

`LAMBDA_NAME` and `LAMBDA_FREQUENCY` are required. Note that `TEST_ENV` was added as an example to show that values configured in `.env` will be available in your lambda code.

The value for the lambda frequency should come from [AWS's scheduled events documentation](# See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html)

4.  Install dependencies `npm install`

5.  Set it up with `aws configure`

## Okay, I'm ready to run it!

- To deploy infrastructure, run `./deploy.sh`
