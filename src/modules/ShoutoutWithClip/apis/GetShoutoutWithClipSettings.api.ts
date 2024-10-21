import { prisma } from "../../../database/prisma";

export async function getShoutoutWithClipSettings(accountId: string) {

    return prisma.shoutoutWithClip.findUniqueOrThrow({
        where: {
            accountId,
        },
    })

}