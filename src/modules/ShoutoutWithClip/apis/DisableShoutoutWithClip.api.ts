import { prisma } from "../../../database/prisma";

export async function disableShoutoutWithClip(accountId: string) {

    return prisma.shoutoutWithClip.update({
        where: { id: accountId },
        data: {
            isEnabled: false,
        },
    })

}