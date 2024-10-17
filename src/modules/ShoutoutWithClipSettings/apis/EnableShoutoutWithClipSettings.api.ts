import { prisma } from "../../../database/prisma";
import { createChannelChatMessageEvent } from "../../../events/CreateChannelChatMessageEvent";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";
import { TwitchEventNotification, TwitchUserAuthorization } from "../../../types/Twitch.type";
import { ChannelChatMessageEvent } from "../../../types/TwitchEventSub.type";
import { createTwitchWebsocketSession } from "../../../utils/createTwitchWebsocketSession";

export async function enableShoutoutWithClipSettings(accountId: string) {

    const account = await prisma.account.findUnique({ where: { id: accountId } })
    
    const usersResponse = await getTwitchUserByAccessToken(account?.twitchAccessToken!)
    const user = usersResponse.data.data[0]

    // const item = await createTwitchWebsocketSession(
    //     'cm28uxtaz0000i3mi4eejywuq',
    //     createChannelChatMessageEvent,
    //     async (message: TwitchEventNotification<ChannelChatMessageEvent>) => {
    //     if (message.payload.event.notice_type === 'raid') {
    //         console.log(`Raid from ${message.payload.event.raid?.user_name}`)
    //     }
    // })

    return prisma.shoutoutWithClipSettings.upsert({
        create: {
            accountId,
        },
        where: { id: accountId },
        update: {
            isEnabled: true,
        },
    })

}