import { AllMiddlewareArgs, GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';

const queueCallback = async ({ client, message }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>) => {
    try {
        const userMessage = message as GenericMessageEvent;

        // Ephemeral message visible only to the requester
        const result = await client.chat.postEphemeral({
            channel: userMessage.channel,
            user: userMessage.user,
            text: "HI THIS IS THE QUEUE"
        });

        // Reaction message to show that the bot is sending response
        await client.reactions.add({
            channel: userMessage.channel,
            name: 'ok',
            timestamp: userMessage.event_ts
        });
        console.log("Queue requested", result);
    } catch (error) {
        console.error(error);
    }
};

export default queueCallback;
