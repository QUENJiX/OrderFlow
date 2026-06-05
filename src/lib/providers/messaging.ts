export type MessageReplyRequest = {
  shopId: string;
  recipientId: string;
  message: string;
};

export type MessageReplyResult = {
  ok: boolean;
  mode: "local-demo" | "meta";
  providerMessageId?: string;
  error?: string;
};

export type MessagingProvider = {
  replyToInquiry(request: MessageReplyRequest): Promise<MessageReplyResult>;
};

export const localMessagingProvider: MessagingProvider = {
  async replyToInquiry() {
    return {
      ok: true,
      mode: "local-demo",
      providerMessageId: "local-demo-message"
    };
  }
};
