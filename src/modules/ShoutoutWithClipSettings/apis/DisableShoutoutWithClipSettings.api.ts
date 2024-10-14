import { prisma } from "../../../database/prisma";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";
import { TwitchUserAuthorization } from "../../../types/Twitch.type";

export async function disableShoutoutWithClipSettings(accountId: string) {

    return prisma.shoutoutWithClipSettings.update({
        where: { id: accountId },
        data: {
            isEnabled: false,
        },
    })

}