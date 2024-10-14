import { prisma } from "../../../database/prisma";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";
import { TwitchUserAuthorization } from "../../../types/Twitch.type";

export async function createOrUpdateAccount(payload: TwitchUserAuthorization) {
    
    const usersResponse = await getTwitchUserByAccessToken(payload.access_token)
    const user = usersResponse.data.data[0]

    return prisma.account.upsert({
        create: {
            twitchId: user.id,
            username: user.login,
            twitchAccessToken: payload.access_token,
            twitchRefreshToken: payload.refresh_token,
            twitchTokenExpiresAt: new Date(Date.now() + payload.expires_in * 1000),
        },
        where: { twitchId: user.id },
        update: {
            username: user.login,
            twitchAccessToken: payload.access_token,
            twitchRefreshToken: payload.refresh_token,
            twitchTokenExpiresAt: new Date(Date.now() + payload.expires_in * 1000),
        },
    })

}