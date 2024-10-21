import { FastifyReply, FastifyRequest } from "fastify";
import { createShoutoutWithClipSettings } from "../apis/CreateShoutoutWithClipSettings.api";
import { enableShoutoutWithClip } from "../apis/EnableShoutoutWithClip.api";
import { disableShoutoutWithClip } from "../apis/DisableShoutoutWithClip.api";
import { updateShoutoutWithClipSettings, UpdateShoutoutWithClipSettingsPayload } from "../apis/UpdateShoutoutWithClipSettings.api";
import { getShoutoutWithClipSettings } from "../apis/GetShoutoutWithClipSettings.api";
import { deliverShoutoutWithClipToClient } from "../apis/DeliverShoutoutWithClipToClient.api";

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

export async function getShoutoutWithClipSettingsController(
	req: FastifyRequest<{
        Params: { accountId: string },
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await getShoutoutWithClipSettings(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function deliverShoutoutWithClipController(
	req: FastifyRequest<{
        Params: { accountId: string },
    }>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		await deliverShoutoutWithClipToClient("705932393");
		return res.status(204);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

