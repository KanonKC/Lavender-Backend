import axios from "axios";
import { configDotenv } from "dotenv";
import { ShowFeatureTwitchClip, ShowFeatureTwitchClipPayload } from "../types/StreamingManagementServer.type";

configDotenv();
const { STREAMING_MANAGEMENT_SERVER_URL } = process.env;

const streamingManagementServerApi = axios.create({
    baseURL: STREAMING_MANAGEMENT_SERVER_URL,
})

export async function showFeaturedTwitchClip(broadcasterId: string, payload: ShowFeatureTwitchClipPayload) {
    return streamingManagementServerApi.post<ShowFeatureTwitchClip>(`/feature-clip`, payload, { params: { broadcasterId } });
}