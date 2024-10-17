import { getAccountById } from "../../modules/Account/apis/GetAccountById.api";
import { createEventSubSubscription } from "../../services/Twitch.service";
import { CreateTwitchEventSubscriptionPayload } from "../../types/Twitch.type";

export async function createChannelChatMessageEvent(accountId: string, sessionId: string) {

    const account = await getAccountById(accountId)

    if (!account.twitchAccessToken) {
        throw new Error("Account does not have a Twitch access token")
    }
    
    const payload: CreateTwitchEventSubscriptionPayload = {
        type: "channel.chat.message",
        version: "1",
        condition: {
            broadcaster_user_id: account.twitchId,
            user_id: account.twitchId
        },
        transport: {
            method: "websocket",
            session_id: sessionId
        }
    }

    return createEventSubSubscription(account.twitchAccessToken, payload)
}