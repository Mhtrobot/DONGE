import { container } from '../container';
import { MediaServices } from '../services/mediaServices';
import { UserAuthenticatedReq } from '../interfaces/AuthenticatedRequest.ts';

export const uploadUserProfile = async (req: UserAuthenticatedReq, res) => {
    //#swagger.tags = ['Files']
    //#swagger.auto = false
    //#swagger.description = 'Upload an image file'
    /* #swagger.parameters['image'] = {
        in: 'formData',
        required: true,
        type: 'file',
        description: 'Image file to upload'
    } */
  try {
    const mediaServices = container.resolve(MediaServices);
    
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "فایلی انتخاب نشده است ❌"
      });
    }
    //check the format and the size
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        message: "فرمت فایل انتخابی مجاز نمی‌باشد ❌"
      });
    }

    //size < 3MB
    if (file.size > 3 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "حجم فایل انتخابی بیشتر از حد مجاز است ❌"
      });
    }

    const result = await mediaServices.uploadUserProfile(file, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در آپلود فایل ❌"
    });
  }
};

export const uploadGroupProfile = async (req: UserAuthenticatedReq, res) => {
    //#swagger.tags = ['Files']
    //#swagger.auto = false
    //#swagger.description = 'Upload an image file'
    /* #swagger.parameters['image'] = {
        in: 'formData',
        required: true,
        type: 'file',
        description: 'Image file to upload'
    } */
  try {
    const mediaServices = container.resolve(MediaServices);

    const groupId = Number(req.params.groupId);
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "فایلی انتخاب نشده است ❌"
      });
    }

    if (!file) {
        return res.status(400).json({
          success: false,
          message: "فایلی انتخاب نشده است ❌"
        });
      }
      //check the format and the size
      if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({
          success: false,
          message: "فرمت فایل انتخابی مجاز نمی‌باشد ❌"
        });
      }
  
      //size < 3MB
      if (file.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "حجم فایل انتخابی بیشتر از حد مجاز است ❌"
        });
      }

    const result = await mediaServices.uploadGroupProfile(file, groupId);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "خطا در آپلود فایل ❌"
    });
  }
};

export const getUserProfile = async (req: UserAuthenticatedReq, res) => {
  try {
    const mediaServices = container.resolve(MediaServices);

    const userId = req.user.id;
    const result = await mediaServices.getUserProfile(userId);
    
    if (!result.success) {
      return res.status(404).json(result);
    }

    res.set('Content-Type', result.contentType);
    result.stream.pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت فایل ❌"
    });
  }
};

export const getGroupProfile = async (req: UserAuthenticatedReq, res) => {
  try {
    const mediaServices = container.resolve(MediaServices);

    const groupId = Number(req.params.groupId);
    const result = await mediaServices.getGroupProfile(groupId);
    
    if (!result.success) {
      return res.status(404).json(result);
    }

    res.set('Content-Type', result.contentType);
    result.stream.pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت فایل ❌" 
    });
  }
};