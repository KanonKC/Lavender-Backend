import { FastifyInstance } from "fastify";
import { twitchAuthentication } from "../../../middleware/auth";
import { createShowAnImageSettingsController, deliverShowAnImageController, disableShowAnImageController, enableShowAnImageController, getShowAnImageSettingsController, updateShowAnImageChannelRewardIdController, updateShowAnImageSettingsController } from "../controllers";


export function createShowAnImageRoutes(server: FastifyInstance) {

    server.route({
        method: 'GET',
        url: '/show-an-image/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: getShowAnImageSettingsController
    })
    server.route({
        method: 'POST',
        url: '/show-an-image/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: createShowAnImageSettingsController
    })
    server.route({
        method: 'PUT',
        url: '/show-an-image/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: updateShowAnImageSettingsController
    })
    server.route({
        method: 'POST',
        url: '/show-an-image/:accountId/settings/channel-reward-id',
        preHandler: [twitchAuthentication],
        handler: updateShowAnImageChannelRewardIdController
    })
    server.route({
        method: 'POST',
        url: '/show-an-image/:accountId/settings/enable',
        preHandler: [twitchAuthentication],
        handler: enableShowAnImageController
    })
    server.route({
        method: 'POST',
        url: '/show-an-image/:accountId/settings/disable',
        preHandler: [twitchAuthentication],
        handler: disableShowAnImageController
    })
    server.route({
        method: 'POST',
        url: '/show-an-image/:twitchId/test',
        preHandler: [twitchAuthentication],
        handler: deliverShowAnImageController
    })

}