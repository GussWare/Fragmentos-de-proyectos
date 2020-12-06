'use strict'

module.exports = {

    ERROR_ID_NOT_VALID: "IDENTIFIER NOT VALID",
    ERROR_CONNECTION_KEYSTONE: "Keystone connection error",
    ERROR_FILE_NOT_FOUND: "Error file not found",

    ERROR_CRUD_RECORD_NOT_FOUND: "Record '{field}' not found",
    ERROR_CRUD_RECORD_ALREADY_EXIST: "The record '{field}' is already in the database",
    ERROR_CRUD_RECORD_DISABLED: "You cannot make changes to the registry because it is disabled",

    ERROR_MIDDELWARE_URL_NOT_VALID : "Middelware Url not valid",
    ERROR_MIDDELWARE_ACTION_NOT_VALID : "Middelware Action not valid",

    ERROR_403_FORBIDDEN: "You do not have permissions to access this area, please log in.",
    ERROR_401_UNAUTHORIZED: "Your session time has expired or you do not have permissions to perform this action.",

    ERROR_UPLOAD_IMAGE_EXTENSION: "The image extension is not valid, only files are allowed, 'jpg, jpeg, png, gif'",
    ERROR_UPLOAD_FILE: "File upload failed",

    ERROR_MESSAGE_INSERT_COUNTRIES: 'Error registering countries',
    ERROR_MESSAGE_GENERIC: 'There was an error processing the request, please try again, if the problem persists notify the administrator.',

    VALIDATOR_MESSAGE_REQUIRED: "The '{field}' field is required!",
    VALIDATOR_MESSAGE_STRING: "The '{field}' field must be a string!",
    VALIDATOR_MESSAGE_STRING_EMPTY: "The '{field}' field must not be empty!",
    VALIDATOR_MESSAGE_STRING_MIN: "The '{field}' field length must be larger than or equal to {expected} characters long!",
    VALIDATOR_MESSAGE_STRING_MAX: "The '{field}' field length must be less than or equal to {expected} characters long!",
    VALIDATOR_MESSAGE_STRING_LENGTH: "The '{field}' field length must be {expected} characters long!",
    VALIDATOR_MESSAGE_STRING_PATTERN: "The '{field}' field fails to match the required pattern!",
    VALIDATOR_MESSAGE_STRING_CONTAIN: "The '{field}' field must contain the '{expected}' text!",
    VALIDATOR_MESSAGE_STRING_ENUM: "The '{field}' field does not match  any of the allowed values!",
    VALIDATOR_MESSAGE_NUMBER: "The '{field}' field must be a number!",
    VALIDATOR_MESSAGE_NUMBER_MIN: "The '{field}' field must be larger than or equal to {expected}!",
    VALIDATOR_MESSAGE_NUMBER_MAX: "The '{field}' field must be less than or equal to {expected}!",
    VALIDATOR_MESSAGE_NUMBER_EQUAL: "The '{field}' field must be equal with {expected}!",
    VALIDATOR_MESSAGE_NUMBER_NOT_EQUAL: "The '{field}' field can't be equal with {expected}!",
    VALIDATOR_MESSAGE_NUMBER_INTEGER: "The '{field}' field must be an integer!",
    VALIDATOR_MESSAGE_NUMBER_POSITIVE: "The '{field}' field must be a positive number!",
    VALIDATOR_MESSAGE_NUMBER_NEGATIVE: "The '{field}' field must be a negative number!",
    VALIDATOR_MESSAGE_ARRAY: "The '{field}' field must be an array!",
    VALIDATOR_MESSAGE_ARRAY_EMPTY: "The '{field}' field must not be an empty array!",
    VALIDATOR_MESSAGE_ARRAY_MIN: "The '{field}' field must contain at least {expected} items!",
    VALIDATOR_MESSAGE_ARRAY_MAX: "The '{field}' field must contain less than or equal to {expected} items!",
    VALIDATOR_MESSAGE_ARRAY_LENGTH: "The '{field}' field must contain {expected} items!",
    VALIDATOR_MESSAGE_ARRAY_CONTAINS: "The '{field}' field must contain the '{expected}' item!",
    VALIDATOR_MESSAGE_ARRAY_ENUM: "The '{field} field value '{expected}' does not match any of the allowed values!",
    VALIDATOR_MESSAGE_BOOLEAN: "The '{field}' field must be a boolean!",
    VALIDATOR_MESSAGE_FUNCTION: "The '{field}' field must be a function!",
    VALIDATOR_MESSAGE_DATE: "The '{field}' field must be a Date!",
    VALIDATOR_MESSAGE_DATE_MIN: "The '{field}' field must be larger than or equal to {expected}!",
    VALIDATOR_MESSAGE_DATE_MAX: "The '{field}' field must be less than or equal to {expected}!",
    VALIDATOR_MESSAGE_FORBIDDEN: "The '{field}' field is forbidden!",
    VALIDATOR_MESSAGE_EMAIL: "The '{field}' field must be a valid e-mail!",


    VALIDATOR_MESSAGE_ARRAY_NUMBER_INTIGER: 'Identifiers not valid',
    COUNTRIES_ADDED_SUCCESSFULLY: 'The countries were added successfully',
    SEO_ADDED_SUCCESSFULLY: 'The data were added successfully',

    TXT_GUIDE_SUBTITLE_DEFAULT: 'Some of the activities',
    TXT_ACCOMODATION_SUBTITLE_DEFAULT: 'Choose from Hostel, 3 Star or 4 Star Hotels',
    TXT_ACTIVITIES_SUBTITLE_DEFAULT: 'Texto por definir',
    TXT_EXTRAS_SUBTITLE_DEFAULT: 'Handy extras and accessories',


    CHECKOUT_ERROR_PASSENGER_REQUIRED: "The field 'Passengers' is required",
    CHECKOUT_ERROR_RESERVATIONS_REQUIRED: "The field 'Reservations' is required",
    CHECKOUT_ERROR_ROOM_OCUPATE_RULE_LIST_REQUIRED: "The field 'RoomOccupateRuleList' is required",
    CHECKOUT_ERROR_NUMBER_OF_PERSON_EXCEEDS: "The number of people exceeds the allowed",

    COUPON_AND_DISCOUNT_INVALID_COUPON: "The coupon was not found",
    COUPON_AND_DISCOUNT_INVALID_DATES_PURSHASE: "Invalid purchase dates",
    COUPON_AND_DISCOUNT_INVALID_DATES_TRAVEL: "Invalid travel dates. Please try again",
    COUPON_AND_DISCOUNT_INVALID_COUPON_NAME: "Invalid coupon name. Please try again",

    STATIC_DATA_NO_TOUR: "Tour no encontrado",
    BAMBA_SYNC_BAMBA_NO_TOURS: "No hay tours",

    FREE_DAY_TITLE: 'Free Day',

    ACCOMODATION_TEXT_CHECKIN: 'Check In',

    TXT_MEALS_BREAKFAST: "Breakfast(s)",
    TXT_MEALS_LUNCH: "Lunch(es)",
    TXT_MEALS_DINNER: "Dinner(s)",
    TXT_MEALS_SNACK: "Snack(s)",

    SENDINGBLUE_SUCCESS: "Thanks! You have successfully subscribed to our Newsletter.",
    SENDINGBLUE_EXISTS: "Sorry, please try again, or use another email address.",

    ACCOUNT_LOGIN_FAILD: "The email and password are not correct",
    ACCOUNT_NOT_USER_FOUND: "The user was not found, or it may be disabled",
    ACCOUNT_ERROR_CREATE_SUPER_AGENCY_ERROR_SUPER_AGENCY_REQUIREDUSER_ACCOUNT: "Error creating user account",

    ACCOUNT_ERROR_NOT_HAVE_PERMISSIONS_TO_MAKE_PURCHASES:"You do not have permissions to make purchases",
    ACCOUNT_ERROR_NOT_CREATE_SUPER_ADMIN:"You do not have permissions to  super adimin users",
    ACCOUNT_ERROR_NOT_CREATE_SUPER_ADMIN:"You do not have permissions to create super adimin users",

    ACCOUNT_ERROR_NOT_PERMIT_ACCOUNT_TYPE:"You do not have permissions to create these types of users",

    ACCOUNT_ERROR_NOT_DELETE_SUPER_ADMIN:"The super user cannot be deleted",
    ACCOUNT_ERROR_NOT_DISHABELD_SUPER_ADMIN:"The super user cannot be disabled",

    SUPER_AGENCY_ERROR_SUPER_AGENCY_DISABLED: "You cannot access because your super agency is disabled",
    SUPER_AGENCY_ERROR_SUPER_AGENCY_REQUIRED:"The super agency is required.",
    SUPER_AGENCY_ERROR_NOT_SUPER_AGENCY_SELECTED:"A super agency was not selected",
    SUPER_AGENCY_ERROR_NOT_THE_AGENCY_DOEST_NOT_BELONG_TO_SUPER_AGENCY:"The agency does not belong to the super agency",

    AGENCY_ERROR_AGENCY_DISABLED: "You cannot access because your agency is disabled",
    AGENCY_ERROR_AGENCY_401_UNAUTHORIZED: "You cannot access because your agency is disabled",
    AGENCY_ERROR_AGENCY_REQUIRED:"The agency is required.",

    STORE_ERROR_STORE_DISABLED: "You cannot access because your store is disabled",
    STORE_ERROR_STORE_401_UNAUTHORIZED: "You cannot access because your store is disabled",
    STORE_ERROR_STORE_REQUIRED:"The store is required.",

    ERROR_AGENCY_DISABLED: "You cannot perform this action, the agency is disabled.",

    RESERVATION_NOT_FOUND: "Reservation not found",

    RESERVATION_NO_ITEMS: "There are no items for this reservation"
};