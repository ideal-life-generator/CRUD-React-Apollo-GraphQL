import { GraphQLString, GraphQLNonNull } from 'graphql';
import chalk from 'chalk';
import ytdl from 'ytdl-core';
import VideoInfoType from '../types/VideoInfo';

export default {
  type: new GraphQLNonNull(VideoInfoType),
  args: {
    videoId: {
      type: GraphQLString,
    },
  },
  async resolve(root, args) {
    try {
      const response = await ytdl.getInfo(args.videoId);

      const {
        title,
        length_seconds: lengthSecondsString,
        iurlhq: imageUrl,
        view_count: viewsString,
      } = response;

      const lengthSeconds = parseInt(lengthSecondsString, 10);
      const views = parseInt(viewsString, 10);

      return {
        title,
        lengthSeconds,
        imageUrl,
        views,
      };
    } catch (error) {
      console.error(chalk.red(error));

      throw new Error(error);
    }
  },
};
