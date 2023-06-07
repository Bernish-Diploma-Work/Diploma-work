import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Ivs } from '@aws-sdk/client-ivs';
import { configService } from '../../config/config.service';

@Injectable()
export class IvsService {
  private logger = new Logger(IvsService.name);
  private readonly client: Ivs;

  constructor() {
    this.client = new Ivs({
      ...configService.awsConfig,
    });
  }

  async createChannel(userId: number): Promise<string> {
    const channel = await this.client.createChannel({
      name: 'streamChannel' + userId,
      type: 'STANDARD',
      latencyMode: 'LOW',
      authorized: false,
      insecureIngest: false,
      // recordingConfigurationArn, think to add recording configuration
    });

    const arn = channel.channel.arn;

    return arn;
  }

  async createStream(channelArn: string): Promise<{
    arn: string;
    value: string;
    ingest: string;
  }> {
    const res = await this.client.createStreamKey({
      channelArn,
    });
    const res2 = await this.client.getChannel({
      arn: channelArn,
    });

    return {
      arn: res.streamKey.arn,
      value: res.streamKey.value,
      ingest: res2.channel.ingestEndpoint,
    };
  }

  async getPlaybackUrl(channelArn: string) {
    const res = await this.client.getChannel({
      arn: channelArn,
    });

    const playbackUrl = res.channel.playbackUrl;
    return playbackUrl;
  }

  async stopStream(channelArn: string) {
    const res = await this.client.stopStream({
      channelArn,
    });
    return;
  }

  async deleteAllStreamKeys(channelArn: string) {
    const list = await this.client.listStreamKeys({
      channelArn,
    });

    await Promise.all(
      list.streamKeys.map((v) =>
        this.client.deleteStreamKey({
          arn: v.arn,
        }),
      ),
    );
  }

  async getChannelByArn(arn: string) {
    const res = await this.client.getChannel({
      arn,
    });

    const channel = res.channel;

    if (!channel) {
      throw new NotFoundException();
    }

    // const ingestServer = channel.ingestEndpoint;
    // const playbackUrl = channel.playbackUrl;
    //
    // this.client.getStreamKey();
  }
}

export const ivsService = new IvsService();
