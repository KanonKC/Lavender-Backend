import { FastifyReply, FastifyRequest } from "fastify";
import { createShowAnImageSettings } from "../apis/CreateShowAnImageSettings.api";
import {
	updateShowAnImageSettings,
	UpdateShowAnImageSettingsPayload,
} from "../apis/UpdateShowAnImageSettings.api";
import { getShowAnImageSettings } from "../apis/GetShowAnImageSettings.api";
import { deliverShowAnImageToClient } from "../apis/DeliverShowAnImageToClient.api";

export async function createShowAnImageSettingsController(
	req: FastifyRequest<{
		Params: { accountId: string };
	}>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await createShowAnImageSettings(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}

export async function enableShowAnImageController(
	req: FastifyRequest<{
		Params: { accountId: string };
	}>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await updateShowAnImageSettings(accountId, {
			isEnabled: true,
		});
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}

export async function disableShowAnImageController(
	req: FastifyRequest<{
		Params: { accountId: string };
	}>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await updateShowAnImageSettings(accountId, {
			isEnabled: false,
		});
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}

export async function updateShowAnImageChannelRewardIdController(
    req: FastifyRequest<{
        Params: { accountId: string };
        Body: { channelRewardId: string };
    }>,
    res: FastifyReply
) {
    const { accountId } = req.params;
    try {
        const response = await updateShowAnImageSettings(accountId, {
            channelRewardId: req.body.channelRewardId,
        });
        return res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error: error });
    }
}

export async function updateShowAnImageSettingsController(
	req: FastifyRequest<{
		Params: { accountId: string };
		Body: UpdateShowAnImageSettingsPayload;
	}>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await updateShowAnImageSettings(accountId, req.body);
		return res.status(200).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
}

export async function getShowAnImageSettingsController(
	req: FastifyRequest<{
		Params: { accountId: string };
	}>,
	res: FastifyReply
) {
	const { accountId } = req.params;
	try {
		const response = await getShowAnImageSettings(accountId);
		return res.status(200).send(response);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}

export async function deliverShowAnImageController(
	req: FastifyRequest<{
        Params: { twitchId: string },
    }>,
	res: FastifyReply
) {
	const { twitchId } = req.params;
	try {
		await deliverShowAnImageToClient(twitchId, "https://i.redd.it/80jykz32log21.png");
		return res.status(204);
	} catch (error) {
		res.status(404).send({ error: error });
	}
}
