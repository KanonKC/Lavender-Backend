// import { io } from "socket.io-client";

// const twitchSocket = io('wss://eventsub.wss.twitch.tv/ws');

// export default twitchSocket;
import WebSocket from "ws";
import { TwitchEventSubscription, TwitchWebsocketSession } from "../types/Twitch.type";
import { AxiosResponse } from "axios";
// import { createChannelChatMessageEvent } from './events/ChannelChatMessage/CreateChannelChatMessageEvent';
// import { deleteEventSubSubscription, getEventSubSubscriptions } from './services/Twitch.service';

// Create WebSocket connection.
// const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

export async function createTwitchWebsocketSession(
    id: string,
	twitchEventSubCreateFunction: (id: string, sessionId: string) => Promise<AxiosResponse<TwitchEventSubscription>>
) {
	const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

	ws.on("open", async () => {
		console.log("Connected to Twitch EventSub WebSocket");
	});

	ws.on("message", async (data) => {
		const message: TwitchWebsocketSession = JSON.parse(data.toString());

		if (message.metadata.message_type === "session_welcome") {
			// const eventSubscriptionsResponse = await getEventSubSubscriptions()

			// const disconnectedSubscriptionsPromise = eventSubscriptionsResponse.data.data
			//     .filter((sub) => sub.status === 'websocket_disconnected')
			//     .map((sub) => deleteEventSubSubscription(sub.id))

			// await Promise.all(disconnectedSubscriptionsPromise)

			const response = await twitchEventSubCreateFunction(id, message.payload.session.id);
            console.log("It success", response.data)
		} else {
			console.log("Received message:", message);
		}
	});

	ws.on("error", (error) => {
		console.error("WebSocket error:", error);
	});

	ws.on("close", () => {
		console.log("WebSocket connection closed");
	});
}
