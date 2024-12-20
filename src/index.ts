import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { configDotenv } from 'dotenv'
// import server from './router'
import fastify from 'fastify'
import path from 'node:path'
import createRoutes from './router'
import { bulkResetTwitchEventSubscriptions } from './websockets/BulkResetEventSubscriptions'
import { createChannelPointCustomRewardRedemptionAddEvent } from './websockets/ChannelPointCustomRewardRedemptionAdd/CreateChannelPointCustomRewardRedemptionAddEvent'
import { handleChannelPointCustomRewardRedemptionAddEvent } from './websockets/ChannelPointCustomRewardRedemptionAdd/HandleChannelPointCustomRewardRedemptionAddEvent'
import { createTwitchWebsocketSession } from './utils/createTwitchWebsocketSession'

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
    
    await bulkResetTwitchEventSubscriptions()
    console.log(`Server listening at ${address}`)
})