import axios, { AxiosResponse } from "axios";
import { configDotenv } from "dotenv";
import {
    CreateTwitchEventSubscriptionPayload,
	TwitchAppAuthorization,
	TwitchChannelInfo,
	TwitchEventSubscription,
	TwitchUserAuthorization,
    TwitchUsers,
} from "../types/Twitch.type";
import { getAccountById } from "../modules/Account/apis/GetAccountById.api";

configDotenv();
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_OAUTH_TOKEN, PORT } =
	process.env;

const twitchAPI = axios.create({
	baseURL: "https://api.twitch.tv/helix",
	headers: {
		"Client-Id": TWITCH_CLIENT_ID,
		Authorization: `Bearer ${TWITCH_OAUTH_TOKEN}`,
	},
});

export async function getUserLoginAccessToken(
	code: string
): Promise<AxiosResponse<TwitchUserAuthorization>> {
	const authOptions = {
		url: "https://id.twitch.tv/oauth2/token",
		form: {
			code: code,
			client_id: TWITCH_CLIENT_ID,
			client_secret: TWITCH_CLIENT_SECRET,
			redirect_uri: `http://localhost:${PORT}/twitch/callback`,
			grant_type: "authorization_code",
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		json: true,
	};

	return axios.post(authOptions.url, authOptions.form, {
		headers: authOptions.headers,
	});
}

export async function getTwitchAppAccessToken(): Promise<
	AxiosResponse<TwitchAppAuthorization>
> {
	const authOptions = {
		url: "https://id.twitch.tv/oauth2/token",
		form: {
			client_id: TWITCH_CLIENT_ID,
			client_secret: TWITCH_CLIENT_SECRET,
			grant_type: "client_credentials",
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		json: true,
	};

	return axios.post(authOptions.url, authOptions.form, {
		headers: authOptions.headers,
	});
}

export async function getChannelInfo(broadcasterId: string) {
	return twitchAPI.get<TwitchChannelInfo>("/channels", {
		params: { broadcaster_id: broadcasterId },
	});
}

// export async function createPrediction(payload: CreatePredctionPayload) {
//     const { accessToken } = await twitchStore.loadToken();
//     return twitchAPI.post<TwitchPrediction>('/predictions', payload, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
// }

// export async function updatePrediction(payload: UpdatePredctionPayload) {
//     const { accessToken } = await twitchStore.loadToken();
//     return twitchAPI.patch<TwitchPrediction>('/predictions', payload, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
// }

export async function createEventSubSubscription(
    accessToken: string,
    payload: CreateTwitchEventSubscriptionPayload
): Promise<AxiosResponse<TwitchEventSubscription>> {
    return twitchAPI.post<TwitchEventSubscription>('/eventsub/subscriptions', payload, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

// export async function getEventSubSubscriptions(): Promise<AxiosResponse<TwitchEventSubscription>> {
//     const { accessToken } = await twitchStore.loadToken()
//     return twitchAPI.get<TwitchEventSubscription>('/eventsub/subscriptions', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
// }

// export async function deleteEventSubSubscription(id: string): Promise<AxiosResponse<TwitchEventSubscription>> {
//     const { accessToken } = await twitchStore.loadToken()
//     return twitchAPI.delete<TwitchEventSubscription>('/eventsub/subscriptions', {
//         params: { id },
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
// }

export async function getTwitchUserByAccessToken(accessToken: string) {
    return twitchAPI.get<TwitchUsers>('/users', {
        headers: {
            "Client-Id": TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`
        }
    })
}
