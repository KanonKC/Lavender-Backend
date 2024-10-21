import { prisma } from "../../../database/prisma";
import { getTwitchUserByAccessToken } from "../../../services/Twitch.service";

export interface UpdateShoutoutWithClipSettingsPayload {
    featuredClipPriority: boolean
}

export async function updateShoutoutWithClipSettings(accountId: string, payload: UpdateShoutoutWithClipSettingsPayload) {

    return prisma.shoutoutWithClip.update({
        where: { accountId },
        data: {
            featuredClipPriority: payload.featuredClipPriority,
        },
    })

}