import { prisma } from "../../../database/prisma";
import { showAnImage, showFeaturedTwitchClip } from "../../../services/StreamingManagementServer.service";
import socket from "../../../socket";

const { BACKEND_URL } = process.env;

export async function deliverShowAnImageToClient(twitchId:string, url: string) {
	const path = `${process.cwd()}/dumps/show-an-images`;

    const account = await prisma.account.findUniqueOrThrow({
        where: {
            twitchId: twitchId,
        },
        include : { showAnImage: true}
    })

    const showAnImageSettings = account.showAnImage;

    if (!showAnImageSettings) {
        return;
    }

    const showImageResponse = await showAnImage({
        url: url,
        options: {
            outputVideoFilePath: path,
        },
    });

    const deliveryPackage = {
        key: showAnImageSettings.key,
        package: {
            imageUrl: `${BACKEND_URL}/public/show-an-images/${showImageResponse.data.filename}`,
        }
    }

	console.log("response", deliveryPackage);
	return socket.emit("deliverShowAnImage", deliveryPackage);
}
