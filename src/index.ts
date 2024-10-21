import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { configDotenv } from 'dotenv'
// import server from './router'
import fastify from 'fastify'
import path from 'node:path'
import createRoutes from './router'
import { bulkResetTwitchEventSubscriptions } from './websockets/BulkResetEventSubscriptions'

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

    // await createTwitchWebsocketSession(
    //     'cm28uxtaz0000i3mi4eejywuq',
    //     createChannelChatMessageEvent,
    //     handleChannelChatMessageEvent
    // )
    await bulkResetTwitchEventSubscriptions()
    console.log(`Server listening at ${address}`)
})