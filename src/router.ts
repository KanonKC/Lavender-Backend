import { FastifyInstance } from "fastify";
import { createOrUpdateAccountController } from "./modules/Account/controllers/CreateOrUpdateAccount.controller";


function createRoutes(server: FastifyInstance) {

    // Internal
    server.post('/accounts', createOrUpdateAccountController)

    // External
    

}

export default createRoutes