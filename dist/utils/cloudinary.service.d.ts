export declare class CloudinaryService {
    uploadImage(fileBuffer: Buffer, filename: string): Promise<{
        secure_url: string;
    }>;
}
