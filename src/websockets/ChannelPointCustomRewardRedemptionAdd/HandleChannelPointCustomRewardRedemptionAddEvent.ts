
import { deliverShowAnImageToClient } from "../../modules/ShowAnImage/apis/DeliverShowAnImageToClient.api";
import { ChannelPointCustomRewardRedemptionAddEvent, TwitchEventNotification } from "../../types/Twitch.type";

export async function handleChannelPointCustomRewardRedemptionAddEvent(message: TwitchEventNotification<ChannelPointCustomRewardRedemptionAddEvent>) {
    // if (message.payload.event.notice_type === 'raid') {
    //     console.log(`Raid from ${message.payload.event.raid?.user_name}`)
    // }
    // const path = `${process.cwd()}/dumps/shoutout-clips`
    // console.log('path', path)
    // const clip = await showFeaturedTwitchClip(message.payload.event.chatter_user_id, { options: { outputVideoFilePath: path } })
    // const response = {
    //     videoUrl: `${BACKEND_URL}/public/shoutout-clips/${clip.data.videoFilename}`,
    //     durationMilliseconds: clip.data.durationMilliseconds,
    // }
    // socket.emit('deliverShoutoutWithClip', response)
    // console.log(response)
    console.log('redeem', message)
    await deliverShowAnImageToClient(message.payload.event.broadcaster_user_id ,message.payload.event.user_input);
}