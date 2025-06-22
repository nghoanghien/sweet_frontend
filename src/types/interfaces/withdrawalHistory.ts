import { Channel } from "./enums";


export interface WithdrawalHistory {
      id: String,
      time: String,
      withdrawnAmount: Number,
      interestAmount: Number,
      remainingBalance: Number,
      isPartial: Boolean,
      channel: Channel,
      status: String
    }