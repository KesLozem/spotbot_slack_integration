import { App, LogLevel, AwsLambdaReceiver} from '@slack/bolt';
import * as dotenv from 'dotenv';
import registerListeners from './listeners';
import { AwsEvent, AwsCallback } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';

dotenv.config();

/** Initialization */
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: (process.env.SLACK_SIGNING_SECRET) ? process.env.SLACK_SIGNING_SECRET : '',
})

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  //signingSecret: process.env.SLACK_SIGNING_SECRET,
  //logLevel: LogLevel.DEBUG,
  receiver: awsLambdaReceiver,

    // When using the AwsLambdaReceiver, processBeforeResponse can be omitted.
    // If you use other Receivers, such as ExpressReceiver for OAuth flow support
    // then processBeforeResponse: true is required. This option will defer sending back
    // the acknowledgement until after your handler has run to ensure your handler
    // isn't terminated early by responding to the HTTP request that triggered it.

    // processBeforeResponse: true
});

/** Register Listeners */
registerListeners(app);

// Handle the Lambda function event
module.exports.handler = async (event: AwsEvent, context: any, callback: AwsCallback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
}