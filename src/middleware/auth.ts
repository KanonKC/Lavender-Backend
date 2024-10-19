import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { getAccountByTwitchAccessToken } from "../modules/Account/apis/GetAccountByTwitchAccessToken.api";

export async function twitchAuthentication(
    request: FastifyRequest,
    reply: FastifyReply,
) {

    const authorization = request.headers.authorization;
    console.log(authorization);
    
    if (!authorization) {
        return reply.code(401).send({ message: "Unauthorized" });
        // done(new Error("Unauthorized"));
    }

    const token = String(authorization).split(" ")[1];
    const account = await getAccountByTwitchAccessToken(token);

    if (!account) {
        return reply.code(404).send({ message: "Account not found" });
       // return done(new Error("Account not found"));
    }

    if (
        !account ||
        !account.twitchAccessToken ||
        !account.twitchRefreshToken ||
        !account.twitchTokenExpiresAt ||
        new Date(account.twitchTokenExpiresAt) < new Date()
    ) {
        return reply.code(401).send({ message: "Unauthorized" });
        //return done(new Error("Unauthorized"));
    }

    // done();
}