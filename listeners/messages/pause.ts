import { GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';

const pauseCallback = async ({ message, say }: SlackEventMiddlewareArgs<'message'>) => {
    try {
        const userMessage = message as GenericMessageEvent;
        await say(`<@${userMessage.user}> paused the playback!`);
    } catch (error) {
        console.error(error);
    }
};

export default pauseCallback;

/* 
userMessage: {
  user: 'U07JS7CUE76',
  type: 'message',
  ts: '1724902129.865799',
  client_msg_id: '8edb06a2-4d8e-4751-a21b-96e014e2dd3d',
  text: '!pause',
  team: 'T07JH3X8Y06',
  blocks: [ { type: 'rich_text', block_id: 'rtGkB', elements: [Array] } ],
  channel: 'C07K2CSDJV7',
  event_ts: '1724902129.865799',
  channel_type: 'channel'
}

*/