import { showFeaturedTwitchClip } from "../../services/StreamingManagementServer.service";
import { TwitchEventNotification } from "../../types/Twitch.type";
import { ChannelChatMessageEvent } from "../../types/TwitchEventSub.type";

export async function handleChannelChatMessageEvent(message: TwitchEventNotification<ChannelChatMessageEvent>) {
    // if (message.payload.event.notice_type === 'raid') {
    //     console.log(`Raid from ${message.payload.event.raid?.user_name}`)
    // }
    console.log(`[${message.payload.event.chatter_user_name}]: ${message.payload.event.message.text}`)
    const clip = await showFeaturedTwitchClip(message.payload.event.chatter_user_id)
    console.log(`[${message.payload.event.chatter_user_name}]: ${clip.data.filename} ${clip.data.durationMilliseconds}`)
}