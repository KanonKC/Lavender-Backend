import { FastifyReply, FastifyRequest } from "fastify";
import { createChannelChatMessageEventWorkflow } from "../workflow";

export async function createChannelChatMessageEventWorkflowController(
    req: FastifyRequest<{
        Params: { accountId: string },
    }>,
    res: FastifyReply
) {
    const { accountId } = req.params;
    try {
        await createChannelChatMessageEventWorkflow(accountId);
        return res.status(204);
    } catch (error) {
        res.status(500).send({ error: error });
    }
}