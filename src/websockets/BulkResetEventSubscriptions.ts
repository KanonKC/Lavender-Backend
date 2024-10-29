import { prisma } from "../database/prisma"
import { deleteEventSubSubscription, getEventSubSubscriptions } from "../services/Twitch.service"

export async function removeUserTwitchSubscriptions(accessToken: string) {

    const eventSubscriptionsResponse = await getEventSubSubscriptions(accessToken)

    const disconnectedSubscriptionsPromise = eventSubscriptionsResponse.data.data
        .filter((sub) => sub.status === 'websocket_disconnected')
        .map((sub) => deleteEventSubSubscription(accessToken, sub.id))
    
    await Promise.all(disconnectedSubscriptionsPromise)
}

export async function bulkResetTwitchEventSubscriptions() {
    const users = await prisma.account.findMany({
        where: {
            twitchAccessToken: {
                not: null
            }
        }
    })

    try {
        const resetPromises = users.map((user) => removeUserTwitchSubscriptions(user.twitchAccessToken!))
        await Promise.all(resetPromises)
    } catch (error) {
        
    }
}