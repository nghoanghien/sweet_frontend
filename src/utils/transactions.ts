import { Channel } from "@/types/interfaces/enums";

export function getChannelLabel(channel: Channel): string {
  switch (channel) {
    case Channel.OVER_THE_COUNTER:
      return 'Giao dịch tại quầy';
    case Channel.ONLINE:
      return 'Giao dịch trực tuyến';
    default:
      return 'Giao dịch tại quầy';
  }
}

export function getChannelByCode(code: number): Channel {
  switch (code) {
    case 1:
      return Channel.OVER_THE_COUNTER;
    case 2:
      return Channel.ONLINE;
    default:
      return Channel.OVER_THE_COUNTER;
  }
}

