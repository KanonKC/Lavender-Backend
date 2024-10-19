import { FastifyReply, FastifyRequest } from "fastify";
import { createShoutoutWithClipSettings } from "../apis/CreateShoutoutWithClipSettings.api";
import { updateShoutoutWithClipSettings, UpdateShoutoutWithClipSettingsPayload } from "../apis/UpdateShoutoutWithClipSettings.api";

export async function updateShoutoutWithClipSettingsController(
	req: FastifyRequest<{
        Params: { accountId: string },
        Body: UpdateShoutoutWithClipSettingsPayload
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await updateShoutoutWithClipSettings(accountId, req.body);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}
