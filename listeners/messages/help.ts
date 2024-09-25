import { AllMiddlewareArgs, GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';

const helpCallback = async ({ client, message }: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>) => {
    try {
        const userMessage = message as GenericMessageEvent;

        // Ephemeral message visible only to the requester
        await client.chat.postEphemeral({
            channel: userMessage.channel,
            user: userMessage.user,
            "text": "!play - starts music playback, !pause - pause playback, !skip - skip playback, !queue - show the queue, !search string - search your string",
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Spotbot Commands",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": "Control Spotify together from within Slack!",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*!play* - Starts music playback"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*!pause* - Stops music playback"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*!skip* - Skips the current song"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*!queue* - Displays a private view of the queue of songs"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*!search* <string> - Searches Spotify with string provided"
                    }
                }
            ]
        });

        // Reaction message to show that the bot is sending response
        await client.reactions.add({
            channel: userMessage.channel,
            name: 'ok',
            timestamp: userMessage.event_ts
        });
        
    } catch (error) {
        console.error(error);
    }
};

export default helpCallback;