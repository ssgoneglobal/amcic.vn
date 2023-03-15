import s3 from "../../s3.js";
import vars from "../../vars.js";
import { nanoid } from "nanoid";
import httpMsgs from "http-msgs";
import { Response } from "../../utils/response.js";

export default {
  getResignedUrl: (req, res, next) => {
    try {
      const { fileType } = req.body;
      if (fileType !== "jpg" && fileType !== "png" && fileType !== "jpeg") {
        httpMsgs.sendJSON(req, res, { boolean: false });
      }

      const fullFileName = `data/images/${nanoid()}.${fileType}`;
      const s3Params = {
        Bucket: vars.s3Bucket,
        Key: fullFileName,
        Expires: 3000,
        ContentType: `image/${fileType}`,
        ACL: "public-read",
      };

      const presignedUrl = s3.getSignedUrl("putObject", s3Params);

      const returnData = {
        uploadUrl: presignedUrl,
        downloadUrl: `${vars.s3Url}/${fullFileName}`,
      };
      return httpMsgs.sendJSON(req, res, { boolean: true, data: returnData });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  getDownloadLink: async (req, res, next) => {
    try {
      return httpMsgs.sendJSON(req, res, {
        boolean: true,
        data: req.file.location,
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  getUploadImg: async (req, res, next) => {
    try {
      return httpMsgs.sendJSON(req, res, {
        boolean: true,
        data: req.file.filename,
        imageUrl: `${vars.baseUrl}/uploads/images/${req.file.filename}`,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};
