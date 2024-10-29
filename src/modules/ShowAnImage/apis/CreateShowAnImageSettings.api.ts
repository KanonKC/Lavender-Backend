import { prisma } from "../../../database/prisma";

export async function createShowAnImageSettings(accountId: string) {
    return prisma.showAnImage.create({
        data: {
            accountId,
            isEnabled: true,
        },
    })
}