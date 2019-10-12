import events = require("@aws-cdk/aws-events");
import targets = require("@aws-cdk/aws-events-targets");
import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");
import { config } from "dotenv";
import * as fs from "fs";
config();

export class LambdaCronStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const lambdaFn = new lambda.Function(this, id, {
      code: new lambda.AssetCode("lambda"),
      handler: "index.handler",
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_8_10
    });

    Object.keys(process.env).map((envName: string) => {
      if (
        fs
          .readFileSync(".env")
          .toString()
          .includes(envName)
      ) {
        const envValue = process.env[envName];
        if (!envValue || envName === "_") {
          console.log(`Not passing environment variable to lambda: ${envName}`);
          return;
        }

        console.log(`Adding environment variable: ${envName} => ${envValue}`);
        lambdaFn.addEnvironment(envName, envValue);
      }
    });

    if (!process.env.LAMBDA_FREQUENCY) {
      throw new Error(
        "process.env.LAMBDA_FREQUENCY not found. Please update .env"
      );
    }
    const schedule = events.Schedule.expression(process.env.LAMBDA_FREQUENCY);
    const rule = new events.Rule(this, "Rule", {
      schedule
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn as any) as any);
  }
}

const app = new cdk.App();
if (!process.env.LAMBDA_NAME) {
  throw new Error("process.env.LAMBDA_NAME not found. Please update .env");
}
new LambdaCronStack(app, process.env.LAMBDA_NAME);
app.synth();
