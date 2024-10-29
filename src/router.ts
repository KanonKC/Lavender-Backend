import { FastifyInstance } from "fastify";
import { createOrUpdateAccountController } from "./modules/Account/controllers/CreateOrUpdateAccount.controller";
import { createShoutoutWithClipRoutes } from "./modules/ShoutoutWithClip/routes";
import { createWebsocketRoutes } from "./websockets/router";
import { createShowAnImageRoutes } from "./modules/ShowAnImage/routes";



function createRoutes(server: FastifyInstance) {

    server.post('/accounts', createOrUpdateAccountController)

    createShoutoutWithClipRoutes(server)
    createShowAnImageRoutes(server)
    
    createWebsocketRoutes(server)
}

export default createRoutes