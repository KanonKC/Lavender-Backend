import { prisma } from "../../../database/prisma";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";
import { TwitchUserAuthorization } from "../../../types/Twitch.type";
import { createTwitchWebsocketSession } from "../../../utils/createTwitchWebsocketSession";

export async function enableShoutoutWithClipSettings(accountId: string) {

    const account = await prisma.account.findUnique({ where: { id: accountId } })
    
    const usersResponse = await getTwitchUserByAccessToken(account?.twitchAccessToken!)
    const user = usersResponse.data.data[0]

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