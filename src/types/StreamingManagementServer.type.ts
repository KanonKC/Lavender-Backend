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

export interface ShowAnImagePayload {
    url: string;
    options: {
        outputVideoFilePath?: string;
    }
}

export interface ShowAnImage {
    code: string;
    imagePath: string | null;
    filename: string | null;
}