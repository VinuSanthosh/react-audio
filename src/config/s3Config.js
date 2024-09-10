import { CONFIG } from './config'
import s3 from "react-aws-s3-typescript"

export const s3Config = {
    accessKeyId: CONFIG.AWS_S3_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_S3_SECRET_KEY,
    bucketName: CONFIG.AWS_S3_BUCKET,
    s3Url: "",
    region: CONFIG.AWS_S3_REGION
}

export const s3Client = new s3(s3Config)
