export interface IUploadFiles {
  [key: string]: Express.MulterS3.File[] | null;
}
