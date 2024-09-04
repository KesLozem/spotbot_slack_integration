import { AllMiddlewareArgs, GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';

const skipCallback = async ({ client, message, say }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>) => {
    try {
        const userMessage = message as GenericMessageEvent;
        const result = await say(`<@${userMessage.user}> chose to skip the song: SONG_NAME`);
        await client.reactions.add({
            channel: userMessage.channel,
            name: 'face_with_peeking_eye',
            timestamp: result.ts
        });
    } catch (error) {
        console.error(error);
    }
};

export default skipCallback;