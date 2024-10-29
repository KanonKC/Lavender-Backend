import { prisma } from "../../../database/prisma";
import { createTwitchWebsocketSession } from "../../../utils/createTwitchWebsocketSession";
import { removeUserTwitchSubscriptions } from "../../../websockets/BulkResetEventSubscriptions";
import { createChannelPointCustomRewardRedemptionAddEvent } from "../../../websockets/ChannelPointCustomRewardRedemptionAdd/CreateChannelPointCustomRewardRedemptionAddEvent";
import { handleChannelPointCustomRewardRedemptionAddEvent } from "../../../websockets/ChannelPointCustomRewardRedemptionAdd/HandleChannelPointCustomRewardRedemptionAddEvent";

export interface UpdateShowAnImageSettingsPayload {
	isEnabled?: boolean;
	enableImageModeration?: boolean;
	channelRewardId?: string;
}

export async function updateShowAnImageSettings(
	accountId: string,
	payload: UpdateShowAnImageSettingsPayload
) {
	const settings = await prisma.showAnImage.update({
		where: { accountId },
		data: {
			isEnabled: payload.isEnabled,
			enableImageModeration: payload.enableImageModeration,
			channelRewardId: payload.channelRewardId,
		},
        include: { account: true}
	});

	if (settings.isEnabled && settings.channelRewardId && settings.account.twitchAccessToken) {
        await removeUserTwitchSubscriptions(settings.account.twitchAccessToken);
		await createTwitchWebsocketSession(
			settings.accountId,
			createChannelPointCustomRewardRedemptionAddEvent,
			handleChannelPointCustomRewardRedemptionAddEvent,
			{ rewardId: settings.channelRewardId }
		);
	}

	return settings;
}
