import { FastifyInstance } from "fastify";
import { createShoutoutWithClipSettingsController } from "./controllers/CreateShoutoutWithClipSettings.controller";
import { updateShoutoutWithClipSettingsController } from "./controllers/UpdateShoutoutWithClipSettings.controller";
import { enableShoutoutWithClip } from "./apis/EnableShoutoutWithClip.api";
import { enableShoutoutWithClipController } from "./controllers/EnableShoutout.controller";
import { disableShoutoutWithClipController } from "./controllers/DisableShoutout.controller";
import { twitchAuthentication } from "../../middleware/auth";

export function createShoutoutWithClipRoutes(server: FastifyInstance) {

    server.route({
        method: 'POST',
        url: '/shoutout-with-clip/:accountId/settings',
        preHandler: [twitchAuthentication],
        handler: createShoutoutWithClipSettingsController
    })

    // server.post('/shoutout-with-clips', createShoutoutWithClipSettingsController)
    server.put('/shoutout-with-clip', updateShoutoutWithClipSettingsController)
    server.put('/shoutout-with-clip/enable', enableShoutoutWithClipController)
    server.put('/shoutout-with-clip/disable', disableShoutoutWithClipController)

}