import { getAccountById } from "../../modules/Account/apis/GetAccountById.api";
import { createEventSubSubscription } from "../../services/Twitch.service";
import { ChannelPointCustomRewardRedemptionAddPayload } from "../../types/Twitch.type";

export async function createChannelPointCustomRewardRedemptionAddEvent(
	accountId: string,
	sessionId: string,
    options?: { rewardId: string }
) {
	const account = await getAccountById(accountId);

	if (!account.twitchAccessToken) {
		throw new Error("Account does not have a Twitch access token");
	}

    if (!options?.rewardId) {
        throw new Error("Reward ID is required");
    }

	const payload: ChannelPointCustomRewardRedemptionAddPayload = {
		type: "channel.channel_points_custom_reward_redemption.add",
		version: "1",
		condition: {
			broadcaster_user_id: account.twitchId,
			reward_id: options.rewardId,
		},
		transport: {
			method: "websocket",
			session_id: sessionId,
		},
	};

	return createEventSubSubscription(account.twitchAccessToken, payload);
}
