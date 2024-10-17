// import { io } from "socket.io-client";

// const twitchSocket = io('wss://eventsub.wss.twitch.tv/ws');

// export default twitchSocket;
import { AxiosResponse } from "axios";
import WebSocket from "ws";
import { TwitchEventNotification, TwitchEventSubscription, TwitchWebsocketWelcomeSession } from "../types/Twitch.type";
// import { createChannelChatMessageEvent } from './events/ChannelChatMessage/CreateChannelChatMessageEvent';
// import { deleteEventSubSubscription, getEventSubSubscriptions } from './services/Twitch.service';

// Create WebSocket connection.
// const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

export async function createTwitchWebsocketSession(
    accountId: string,
	twitchEventSubCreateFunction: (accountId: string, sessionId: string) => Promise<AxiosResponse<TwitchEventSubscription>>,
    handleEventFunction: (message: TwitchEventNotification<any>) => Promise<void>
) {
	const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

	ws.on("open", async () => {
		console.log("Connected to Twitch EventSub WebSocket");
	});

	ws.on("message", async (data) => {
		const message = JSON.parse(data.toString());

		if (message.metadata.message_type === "session_welcome") {
			// const eventSubscriptionsResponse = await getEventSubSubscriptions()

			// const disconnectedSubscriptionsPromise = eventSubscriptionsResponse.data.data
			//     .filter((sub) => sub.status === 'websocket_disconnected')
			//     .map((sub) => deleteEventSubSubscription(sub.id))

			// await Promise.all(disconnectedSubscriptionsPromise)

			await twitchEventSubCreateFunction(accountId, message.payload.session.id);
            // console.log("It success", response.data)
		} else if (message.metadata.message_type !== "session_keepalive") {
			// console.log("Received message:", message);
            await handleEventFunction(message);
		}
	});

	ws.on("error", (error) => {
		console.error("WebSocket error:", error);
	});

	ws.on("close", () => {
		console.log("WebSocket connection closed");
	});

    return ws;
}
