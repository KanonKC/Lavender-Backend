import { prisma } from "../../../database/prisma";

export async function getShowAnImageSettings(accountId: string) {
	return prisma.showAnImage.findUniqueOrThrow({
		where: {
			accountId,
		},
	});
}
