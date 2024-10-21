import { createTwitchWebsocketSession } from "../../utils/createTwitchWebsocketSession";
import { createChannelChatMessageEvent } from "./events/CreateChannelChatMessageEvent";
import { handleChannelChatMessageEvent } from "./events/HandleChannelChatMessageEvent";

export async function createChannelChatMessageEventWorkflow(accountId: string) {
    console.log('Creating channel chat message event workflow')
    return createTwitchWebsocketSession(
        accountId,
        createChannelChatMessageEvent,
        handleChannelChatMessageEvent
    )
}