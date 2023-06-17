import axios from "axios";
import Service from "../../Lib/service";

const AuthService = {
    postLoginDetail: async (data: any) => {
        try {
            return await Service.post(
                {
                    url: `client/enterprise-login`,
                    data,
                }
            );
        } catch (error) {
            throw error;
        }
    },
    postRegisterDetail: async (data: any) => {
        try {
            return await Service.post(
                {
                    url: `client/enterprise-register`,
                    data,
                }
            );
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
