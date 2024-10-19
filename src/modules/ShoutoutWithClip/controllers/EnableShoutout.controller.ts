import { FastifyReply, FastifyRequest } from "fastify";
import { createShoutoutWithClipSettings } from "../apis/CreateShoutoutWithClipSettings.api";
import { updateShoutoutWithClipSettings, UpdateShoutoutWithClipSettingsPayload } from "../apis/UpdateShoutoutWithClipSettings.api";
import { enableShoutoutWithClip } from "../apis/EnableShoutoutWithClip.api";

export async function enableShoutoutWithClipController(
	req: FastifyRequest<{
        Params: { accountId: string },
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await enableShoutoutWithClip(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}
