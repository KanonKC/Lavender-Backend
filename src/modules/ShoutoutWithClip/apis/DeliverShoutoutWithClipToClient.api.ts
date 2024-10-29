import { showFeaturedTwitchClip } from "../../../services/StreamingManagementServer.service";
import socket from "../../../socket";

const { BACKEND_URL } = process.env;

export async function deliverShoutoutWithClipToClient(targetTwitchId: string) {
	const path = `${process.cwd()}/dumps/shoutout-clips`;
	console.log("start");
	const clip = await showFeaturedTwitchClip(targetTwitchId, {
		options: {
            outputVideoFilePath: path,
            resolution: {
                width: 1920,
                height: 1080
            }
        },
	});
	console.log("clip", clip);
	const response = {
		videoUrl: `${BACKEND_URL}/public/shoutout-clips/${clip.data.videoFilename}`,
		durationMilliseconds: clip.data.durationMilliseconds,
	};
	console.log("response", response);
	return socket.emit("deliverShoutoutWithClip", response);
}
