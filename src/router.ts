import { FastifyInstance } from "fastify";
import { createOrUpdateAccountController } from "./modules/Account/controllers/CreateOrUpdateAccount.controller";
import { createShoutoutWithClipRoutes } from "./modules/ShoutoutWithClip/router";
import { twitchAuthentication } from "./middleware/auth";



function createRoutes(server: FastifyInstance) {

    server.post('/accounts', createOrUpdateAccountController)

    createShoutoutWithClipRoutes(server)

}

export default createRoutes