export interface ShowFeatureTwitchClipPayload {
    options : {
        outputVideoFilePath?: string
    }
}

export interface ShowFeatureTwitchClip {
    videoUrl: string;
    filename: string;
    videoFilename: string;
    outputVideoFilePath: string;    
    durationMilliseconds: number; 
}