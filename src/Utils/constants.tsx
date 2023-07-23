export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const VALIDATIONS = Object.freeze({
    INVALID_CONTACT: "Please enter valid contact number",
    USERNAME_EMAIL_REQUIRED: "Please enter email address",
    PASSWORD_REQUIRED: "Please enter password",
    FIRSTNAME_REQUIRED: "Please enter firstname",
    LASTNAME_REQUIRED: "Please enter lastname",
    EMAIL_REQUIRED: "Please enter email",
    NAME_REQUIRED: "Please enter company name",
    REGISTRATION_NUMBER_REQUIRED: "Please enter registration number",
    DEVICE_NAME_REQUIRED: "Please enter device name",
    IMEI_NUMBER_REQUIRED: "Please enter IMEI number",
    AMOUNT_REQUIRED: "Please enter amount",
    DATE_REQUIRED: "Please select date",
    INVALID_EMAIL: "Please enter valid email",
    CONTACT_REQUIRED: "Please enter contact number",
    COUNTRY_REQUIRED: "Please select country",
    INVALID_PASSWORD:
        "Password must contain at least one number and one uppercase and one special characters, and at least 8 or more characters",
    CONFIRM_PASSWORD_REQUIRED: "Please enter confirm password",
    PASSWORD_NOT_MATCH: "Password and Confirm password did not match",
    USERNAME_REQUIRED: "Please enter username",
    OLD_PASSWORD_REQUIRED: "Please enter old password",
    NEW_PASSWORD_REQUIRED: "Please enter new password",
    QUANTITY_LIMIT_ERROR: "You can add upto {totalQuantity}",
    CAPTCHA_REQUIRED: "Please validate captcha",
    PROFILE_UPDATE: "Profile updated successfully",
    STREET_ADDRESS_REQUIRED: "Please enter street address",
    STATE_REQUIRED: "Please select state",
    CITY_REQUIRED: "Please select town / city",
    ZIPCODE_REQUIRED: "Please enter zipcode",
    OLD_NEW_MATCH: "New Password must be different from Old Password",
    COUPON_REQUIRED: "Please enter code",
    CART_ITEM_DELETE: "Product deleted successfully",
    APPLY_CODE_ERROR: "Please add at least one product in cart",
    APPLY_CODE_SUCCESS: "Coupon code is applied",
    SUBJECT_REQUIRED: "Please enter subject",
    CONTACT_SUCCESS: "Your request is send successfully",
    REVIEW_REQUIRED: "Please enter review",
    CARD_HOLDERNAME_REQUIRED: "Please enter card holder name",
    CARD_NUMBER_REQURIED: "Please enter card number",
    CVV_REQUIRED: "Please enter CVV",
    CVV_INVALID: "Please enter valid CVV",
    CARD_NUMBER_LENGTH: "Card number length must be 15 OR 16 number",
    CARD_SELECTION_REQUIRED: "Please select card",
    BILLING_SHIPPING_REQUIRED:
        "Please add billing and shipping address for checkout",
    ADDRESS_REQUIRED: "Please enter address",
    COMPANY_REQUIRED: "Please enter company",
    INTERESTED_PRODUCTS_REQUIRED: "Select product",
    FAX_INVALID: "Please enter valid fax number",
    COUPON_EXPIRED: "This coupon is expired",
    INVALID_NAME: "Please enter valid name.You can add name upto 25 character",
    INVALID_ZIPCODE: "Please enter valid zipcode",
    SOMETHING_WENT_WRONG: "Something went wrong",
    BOOKING_DATE_REQ: "Please enter booking date.",
    BOOKING_STIME_REQ: "Please enter booking start time.",
    BOOKING_ETIME_REQ: "Please enter booking end time.",
    BOOKING_HOUR_REQ: "Please enter booking hours",
    BOOKING_ADDRESS_REQ: "Please enter booking address.",
    BOOKING_SPEC_REQ: "Please select booking speciality."
});

export const AUTH_TOKEN = "accessToken";
export const USER_NAME = "userName";
export const FIRST_NAME = "firstName";
export const LAST_NAME = "lastName";
export const PROFILE = "profile";

export const MESSAGE = {
    UNAUTHORIZED: 'Unauthorized user'
}

export const STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
}