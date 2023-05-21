import axios from "axios";
import Service from "../../Lib/service";

const AuthService = {
    postLoginDetail: async (data: any) => {
        try {
            return await Service.post(
                {
                    url: `agent/enterprise-login`,
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
                    url: `agent/enterprise-register`,
                    data,
                }
            );
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
