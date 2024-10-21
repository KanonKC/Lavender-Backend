export interface ShowFeatureTwitchClipPayload {
    options : {
        outputVideoFilePath?: string;
        resolution?: {
            width: number;
            height: number;
        };
    }
}

export interface ShowFeatureTwitchClip {
    videoUrl: string;
    filename: string;
    videoFilename: string;
    outputVideoFilePath: string;    
    durationMilliseconds: number; 
}