export interface ChannelChatMessageEvent {
    subscription: {}
    event: {
        chatter_user_id: string;
        chatter_user_name: string;
        chatter_is_anonymous: boolean
        color: string;
        message: {
            text: string;
        }
        notice_type: "raid" | string;
        raid: {
            user_id: string;
            user_login: string;
            user_name: string;
        } | null;
    }
}