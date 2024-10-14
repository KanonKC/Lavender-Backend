import fastify from "fastify";
import { createOrUpdateAccountController } from "./modules/Account/controllers/CreateOrUpdateAccount.controller";

const server = fastify()

server.post('/accounts', createOrUpdateAccountController)

export default server