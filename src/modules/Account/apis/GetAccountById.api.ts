import { prisma } from "../../../database/prisma";

export async function getAccountById(id: string) {

    return prisma.account.findUniqueOrThrow({
        where: { id }
    })

}