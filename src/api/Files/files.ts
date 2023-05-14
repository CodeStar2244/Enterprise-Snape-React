import Service from "../../Lib/service"
import { getUserToken } from "../../Utils/helper"


const FilesSevice = {

    addFiles: async (data: any, collectionId: any) => {
        try {
            const token = await getUserToken()
            return Service.post({
                url: `collection/${collectionId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    getFiles: async (collectionId: any) => {
        try {
            const token = await getUserToken()
            return Service.get(`collection/files/${collectionId}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    getFileName: async (collectionId: any) => {
        try {
            const token = await getUserToken()
            return Service.get(`collection/files-name/${collectionId}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    }

}

export default FilesSevice;