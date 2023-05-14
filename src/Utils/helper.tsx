import * as Constants from "./constants";
import { notification } from "antd";

export declare type NotificationPlacement =
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";

export const NotificationWithIcon = (
    type: string,
    message: string,
    placement: NotificationPlacement = "topRight"
): void => {
    if (type === "success") {
        notification.success({
            message,
            placement,
        });
    } else if (type === "error") {
        notification.error({
            message,
            placement,
        });
    } else {
        notification.info({
            message,
            placement,
        });
    }
};

export const getUserToken = () => {
    const { AUTH_TOKEN } = Constants;
    return localStorage.getItem(AUTH_TOKEN);
};

export const isUserLoggedIn = () => {
    const token = getUserToken();
    if (token) {
        return true;
    }
    return false;
};

export const getUserPassword = () => {
    let email: string | null = ""
    let password: string | null = ""
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
        email = localStorage.getItem("email") ? localStorage.getItem("email") : "";
        password = localStorage.getItem("password") ? localStorage.getItem("password") : "";
    }
    return { email, password }
}
export const getNameAndProfile = () => {
    let firstName: string | null = ""
    let lastName: string | null = ""
    if (localStorage.getItem(Constants.FIRST_NAME) && localStorage.getItem(Constants.LAST_NAME)) {
        firstName = localStorage.getItem(Constants.FIRST_NAME) ? localStorage.getItem(Constants.FIRST_NAME) : "";
        lastName = localStorage.getItem(Constants.LAST_NAME) ? localStorage.getItem(Constants.LAST_NAME) : "";
    }
    return { firstName, lastName }
}