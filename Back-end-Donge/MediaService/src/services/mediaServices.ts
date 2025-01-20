import { inject, injectable } from "tsyringe";
import { MediaRepository } from "../repositories/mediaRepository";

@injectable()
export class MediaServices {
  constructor(
    @inject('MediaRepository') private mediaRepository: MediaRepository
  ) {}

  async uploadUserProfile(file: Express.Multer.File, userId: number) {
    const metadata = {
      userId,
      type: 'USER_PROFILE',
      filename: file.originalname,
      contentType: file.mimetype,
      uploadDate: new Date()
    };

    return this.mediaRepository.storeMedia(file.buffer, metadata);
  }

  async uploadGroupProfile(file: Express.Multer.File, groupId: number) {
    const metadata = {
      groupId,
      type: 'GROUP_PROFILE',
      filename: file.originalname,
      contentType: file.mimetype,
      uploadDate: new Date()
    };

    return this.mediaRepository.storeMedia(file.buffer, metadata);
  }

  async getUserProfile(userId: number) {
    return this.mediaRepository.getMediaByUser(userId);
  }

  async getGroupProfile(groupId: number) {
    return this.mediaRepository.getMediaByGroup(groupId);
  }
}