import { injectable } from "tsyringe";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

@injectable()
export class MediaRepository {
  private bucket: GridFSBucket;

  constructor() {
    if (!mongoose.connection.db) {
      throw new Error("MongoDB not connected yet.");
    }
    this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'media'
    });
  }

  async storeMedia(buffer: Buffer, metadata: any) {
    try {
      const uploadStream = this.bucket.openUploadStream(metadata.filename, {
        metadata,
      });

      await new Promise((resolve, reject) => {
        uploadStream.on('error', reject);
        uploadStream.on('finish', resolve);
        uploadStream.end(buffer);
      });

      return {
        success: true,
        fileId: uploadStream.id,
        message: "فایل با موفقیت آپلود شد ✅"
      };
    } catch (error) {
      return {
        success: false,
        message: "خطا در آپلود فایل ❌"
      };
    }
  }

  async getMediaByUser(userId: number) {
    try {
      const files = await this.bucket.find({ 
        "metadata.userId": userId,
        "metadata.type": "USER_PROFILE"
      }).toArray();

      if (!files.length) {
        return {
          success: false,
          message: "تصویر پروفایل یافت نشد ❌"
        };
      }

      const latestFile = files[files.length - 1];
      return {
        success: true,
        stream: this.bucket.openDownloadStream(latestFile._id),
        contentType: latestFile.metadata.contentType
      };
    } catch (error) {
      return {
        success: false,
        message: "خطا در دریافت فایل ❌"
      };
    }
  }

  async getMediaByGroup(groupId: number) {
    try {
      const files = await this.bucket.find({
        "metadata.groupId": groupId,
        "metadata.type": "GROUP_PROFILE"
      }).toArray();

      if (!files.length) {
        return {
          success: false,
          message: "تصویر گروه یافت نشد ❌"
        };
      }

      const latestFile = files[files.length - 1];
      return {
        success: true,
        stream: this.bucket.openDownloadStream(latestFile._id),
        contentType: latestFile.metadata.contentType
      };
    } catch (error) {
      return {
        success: false,
        message: "خطا در دریافت فایل ❌"
      };
    }
  }
}