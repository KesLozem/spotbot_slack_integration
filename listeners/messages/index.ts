import { App } from '@slack/bolt';
import sampleMessageCallback from './sample-message';
import helpCallback from './help';
import playCallback from './play';
import pauseCallback from './pause';
import queueCallback from './queue';
import skipCallback from './skip';
import searchCallback from './search';

const register = (app: App) => {
  app.message(/^(hi|hello|hey).*/, sampleMessageCallback);
  app.message(/^!help$/, helpCallback);
  app.message(/^!play$/, playCallback);
  app.message(/^!pause$/, pauseCallback);
  app.message(/^!queue$/, queueCallback);
  app.message(/^!skip$/, skipCallback);
  app.message(/^!search*/, searchCallback); // TODO: Implement regex FOR LKOSEM
};

export default { register };
