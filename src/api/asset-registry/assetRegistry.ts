import axios from "axios";
import Service from "../../Lib/service";
import { getUserToken } from "../../Utils/helper";

const AssetRegistryService = {
    createDevice: async (data: any) => {
        const token = await getUserToken()
        try {
            return await Service.post(
                {
                    url: `asset`,
                    data,
                }, {
                authorization: token,
            });
        } catch (error) {
            throw error;
        }
    },
    getDeviceList: async (data?: any, query?: any) => {
        const token = await getUserToken()
        try {
            let url = 'asset?'
            if (data !== "") {
                url = `asset?status=${data}&`
            }
            if (query && query !== "") {
                url = url + query
            }
            return await Service.get(url,
                {
                    authorization: token,
                }
            );
        } catch (error) {
            throw error;
        }
    },
    getDashBoardData: async () => {
        const token = await getUserToken()
        try {
            return await Service.get('asset/dashboard',
                {
                    authorization: token,
                }
            );
        } catch (error) {
            throw error;
        }
    },
    updateDevice: async (deviceId: string, data: any) => {
        try {
            const token = await getUserToken()
            return Service.update({
                url: `asset/${deviceId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    }
}

export default AssetRegistryService;
