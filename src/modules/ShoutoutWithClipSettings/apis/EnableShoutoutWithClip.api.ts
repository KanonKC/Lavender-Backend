import { prisma } from "../../../database/prisma";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";

export async function enableShoutoutWithClip(accountId: string) {

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

    return prisma.shoutoutWithClip.upsert({
        create: {
            accountId,
        },
        where: { id: accountId },
        update: {
            isEnabled: true,
        },
    })

}