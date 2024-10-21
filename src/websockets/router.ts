import { FastifyInstance } from "fastify";
import { createChannelChatMessageEventWorkflowController } from "./ChannelChatMessage/controllers";
import { twitchAuthentication } from "../middleware/auth";

export function createWebsocketRoutes(server: FastifyInstance) {
    server.route({
        method: 'POST',
        url: '/websockets/channel-chat-message/:accountId',
        preHandler: [twitchAuthentication],
        handler: createChannelChatMessageEventWorkflowController
    })
}