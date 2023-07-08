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

export const buildQuery = (data: any) => {
    if (typeof (data) === 'string') { return data; }
    const query = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && encodeURIComponent(data[key])) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }
    return query.join('&');
}

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
    return { userName: localStorage.getItem(Constants.USER_NAME) || "" };
};

export const getExperienceLevel = (experiencelevel: number|string) => {
    switch(experiencelevel){
        case 1:
            return "Beginner";
        case 2:
            return "Professional";
        case 3:
            return "Expert";
        default:
            return "-"
    }
}
export const getSpeciality = (speciality: number|string) => {
    switch(speciality){
        case 1:
            return "Photographer";
        case 2:
            return "Videographer";
        case 3:
            return "Both";
        default:
            return "-"
    }
}