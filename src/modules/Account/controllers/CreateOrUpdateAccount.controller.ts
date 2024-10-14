import { FastifyReply, FastifyRequest } from "fastify";
import { TwitchUserAuthorization } from "../../../types/Twitch.type";
import { createOrUpdateAccount } from "../apis/CreateOrUpdateAccount.api";

export async function createOrUpdateAccountController(
	req: FastifyRequest<{
		Body: TwitchUserAuthorization;
	}>,
	res: FastifyReply
) {
	const payload = req.body;
	try {
		const account = await createOrUpdateAccount(payload);
		return res.status(200).send(account);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}
