import { FastifyReply, FastifyRequest } from "fastify";
import { createShoutoutWithClipSettings } from "../apis/CreateShoutoutWithClipSettings.api";

export async function createShoutoutWithClipSettingsController(
	req: FastifyRequest<{
        Params: { accountId: string },
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await createShoutoutWithClipSettings(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}
