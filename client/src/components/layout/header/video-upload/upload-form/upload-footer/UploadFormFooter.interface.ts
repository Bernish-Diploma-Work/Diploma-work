

export interface IUploadFormFooter {
    progress: number;
    isUploaded: boolean;
    isEdit?: boolean;
    onCloseUnfinished: () => void
    isProcessing: boolean
}