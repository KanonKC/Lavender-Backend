import { FastifyInstance } from "fastify";
import { createOrUpdateAccountController } from "./modules/Account/controllers/CreateOrUpdateAccount.controller";
import { createShoutoutWithClipRoutes } from "./modules/ShoutoutWithClip/routes";
import { createWebsocketRoutes } from "./websockets/router";



function createRoutes(server: FastifyInstance) {

    server.post('/accounts', createOrUpdateAccountController)

    createShoutoutWithClipRoutes(server)
    
    createWebsocketRoutes(server)
}

export default createRoutes