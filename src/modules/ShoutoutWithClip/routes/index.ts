import { FastifyInstance } from "fastify";
import { twitchAuthentication } from "../../../middleware/auth";
import { createShoutoutWithClipSettingsController, deliverShoutoutWithClipController, disableShoutoutWithClipController, enableShoutoutWithClipController, getShoutoutWithClipSettingsController, updateShoutoutWithClipSettingsController } from "../controllers";


export function createShoutoutWithClipRoutes(server: FastifyInstance) {

    server.route({
        method: 'GET',
        url: '/shoutout-with-clip/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: getShoutoutWithClipSettingsController
    })
    server.route({
        method: 'POST',
        url: '/shoutout-with-clip/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: createShoutoutWithClipSettingsController
    })
    server.route({
        method: 'PUT',
        url: '/shoutout-with-clip/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: updateShoutoutWithClipSettingsController
    })
    server.route({
        method: 'POST',
        url: '/shoutout-with-clip/:accountId/settings/enable',
        preHandler: [twitchAuthentication],
        handler: enableShoutoutWithClipController
    })
    server.route({
        method: 'POST',
        url: '/shoutout-with-clip/:accountId/settings/disable',
        preHandler: [twitchAuthentication],
        handler: disableShoutoutWithClipController
    })
    server.route({
        method: 'POST',
        url: '/shoutout-with-clip/:accountId/test',
        preHandler: [twitchAuthentication],
        handler: deliverShoutoutWithClipController
    })

}