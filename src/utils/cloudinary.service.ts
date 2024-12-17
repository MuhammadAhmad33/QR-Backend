// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async uploadImage(fileBuffer: Buffer, filename: string): Promise<{ secure_url: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto', public_id: filename },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({ secure_url: result.secure_url }); // Correct response type
          }
        },
      );

      const readableStream = Readable.from(fileBuffer);
      readableStream.pipe(uploadStream);
    });
  }
}
