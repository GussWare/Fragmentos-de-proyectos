'use strict'

import jwt from 'jwt-simple';
import moment from 'moment';

import AclActionTypeModel from '../models/AclActionTypeModel';
import AclActionModel from '../models/AclActionsModel';
import LanguageHelper from '../helpers/LanguageHelper';

exports.AccountAuth = async (req, res, next) => {

    let reqPath = req.path;

    if(reqPath.charAt(0) != "/") {
        reqPath = "/" + reqPath;
    }

    let requestSegments = reqPath.split('/');
    let methodReq = req.method.toLowerCase();
    let payload = null;

    if (!Array.isArray(requestSegments)) {
        return res.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR).send([{
            message: await LanguageHelper.lang('ERROR_MIDDELWARE_URL_NOT_VALID')
        }]);
    }

    if (requestSegments.length < 3) {
        return res.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR).send([{
            message: await LanguageHelper.lang('ERROR_MIDDELWARE_URL_NOT_VALID')
        }]);
    }

    let slug = requestSegments[2].toLowerCase();
    let ActionACL = await AclActionModel.findOne({ slug: slug, method: methodReq }).populate("aclActionType");

    if (!ActionACL) {
        return res.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR).send([{
            message: await LanguageHelper.lang('ERROR_MIDDELWARE_ACTION_NOT_VALID')
        }]);
    }

    if (ActionACL.aclActionType.slug == global.constants.ACL_ACTION_TYPE_PRIVATE) {
        if (!req.headers.authorization) {
            return res.status(global.constants.STATUS_403_FORBIDDEN).send([{
                message: await LanguageHelper.lang('ERROR_403_FORBIDDEN')
            }]);
        }
    }

    if (req.headers.authorization) {
        let token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            payload = jwt.decode(token, process.env.JWT_SECRET);

            if (payload.exp <= moment().unix()) {
                console.log("entro an unix middelware STATUS_401_UNAUTHORIZED");
                return res.status(global.constants.STATUS_401_UNAUTHORIZED).send([{
                    message: await LanguageHelper.lang('ERROR_401_UNAUTHORIZED')
                }]);
            }
        } catch (error) {
            console.log("entro catch middelware STATUS_401_UNAUTHORIZED");
            return res.status(global.constants.STATUS_401_UNAUTHORIZED).send([{
                message: await LanguageHelper.lang('ERROR_401_UNAUTHORIZED')
            }]);
        }
    }

    req.account = payload;
    next();
};