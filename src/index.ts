import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyWebsocket from '@fastify/websocket'
import { configDotenv } from 'dotenv'
// import server from './router'
import { createTwitchWebsocketSession } from './utils/createTwitchWebsocketSession'
import { createChannelChatMessageEvent } from './events/ChannelChatMessageEvent/CreateChannelChatMessageEvent'
import { ChannelChatMessageEvent } from './types/TwitchEventSub.type'
import { TwitchEventNotification } from './types/Twitch.type'
import { handleChannelChatMessageEvent } from './events/ChannelChatMessageEvent/HandleChannelChatMessageEvent'
import fastify from 'fastify'
import createRoutes from './router'
import path from 'node:path';

configDotenv()
const PORT = Number(process.env.PORT) || 8080

const server = fastify()

server.register(cors, { 
    origin: '*'
})

server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'dumps'),
    prefix: '/public/',
    wildcard: true
})

createRoutes(server)

server.listen({ port: PORT }, async (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    await createTwitchWebsocketSession(
        'cm28uxtaz0000i3mi4eejywuq',
        createChannelChatMessageEvent,
        handleChannelChatMessageEvent
    )

    console.log(`Server listening at ${address}`)
})