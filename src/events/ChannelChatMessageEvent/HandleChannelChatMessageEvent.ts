import { showFeaturedTwitchClip } from "../../services/StreamingManagementServer.service";
import { TwitchEventNotification } from "../../types/Twitch.type";
import { ChannelChatMessageEvent } from "../../types/TwitchEventSub.type";

const { BACKEND_URL } = process.env

export async function handleChannelChatMessageEvent(message: TwitchEventNotification<ChannelChatMessageEvent>) {
    // if (message.payload.event.notice_type === 'raid') {
    //     console.log(`Raid from ${message.payload.event.raid?.user_name}`)
    // }
    console.log(`[${message.payload.event.chatter_user_name}]: ${message.payload.event.message.text}`)
    const path = `${process.cwd()}/dumps/shoutout-clips`
    console.log('path', path)
    const clip = await showFeaturedTwitchClip(message.payload.event.chatter_user_id, { options: { outputVideoFilePath: path } })
    const response = {
        ...clip.data,
        videoUrl: `${BACKEND_URL}/public/shoutout-clips/${clip.data.videoFilename}`
    }
    console.log(response)
}