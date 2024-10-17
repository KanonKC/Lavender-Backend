import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv();
const { STREAMING_MANAGEMENT_SERVER_URL } = process.env;

const streamingManagementServerApi = axios.create({
    baseURL: STREAMING_MANAGEMENT_SERVER_URL,
})

export async function showFeaturedTwitchClip(broadcasterId: string) {
    return streamingManagementServerApi.get(`/feature-clip`, { params: { broadcasterId } });
}