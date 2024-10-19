import { prisma } from "../../../database/prisma";

export async function enableShoutoutWithClip(accountId: string) {

    return prisma.shoutoutWithClip.update({
        where: { id: accountId },
        data: {
            isEnabled: true,
        },
    })

}