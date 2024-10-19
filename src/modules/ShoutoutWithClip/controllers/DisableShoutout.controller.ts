import { FastifyReply, FastifyRequest } from "fastify";
import { disableShoutoutWithClip } from "../apis/DisableShoutoutWithClip.api";

export async function disableShoutoutWithClipController(
	req: FastifyRequest<{
        Params: { accountId: string },
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await disableShoutoutWithClip(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}
