import { prisma } from "../../../database/prisma";

export async function getAccountByTwitchAccessToken(twitchAccessToken: string) {

    return prisma.account.findUniqueOrThrow({
        where: { twitchAccessToken }
    })

}