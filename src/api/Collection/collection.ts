import Service from "../../Lib/service"
import { getUserToken } from "../../Utils/helper"


const CollectionService = {

    getCollection: async () => {
        try {
            const token = await getUserToken()
            return Service.get('collection', {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    getCollectionSort: async (data?: any) => {
        try {
            const token = await getUserToken()
            return Service.get(`collection${data}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    getCollectionById: async (collectionId: string) => {
        try {
            const token = await getUserToken()
            return Service.get(`collection/${collectionId}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    createCollection: async (data: string) => {
        try {
            const token = await getUserToken()
            return Service.post({
                url: `collection`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },

    updateCollection: async (collectionId: string, data: any) => {
        try {
            const token = await getUserToken()
            return Service.update({
                url: `collection/${collectionId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    updateCover: async (collectionId: string, data: any) => {
        try {
            const token = await getUserToken()
            return Service.update({
                url: `collection/coverphoto/${collectionId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    deleteCollectionFiles: async (collectionId: string, data: any) => {
        try {
            const token = await getUserToken()
            return Service.removeWithBody({
                url: `collection/files/${collectionId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    deleteCollection: async (collectionId: string) => {
        try {
            const token = await getUserToken()
            return Service.remove(`collection/${collectionId}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    getDesign: async (collectionId: string) => {
        try {
            const token = await getUserToken()
            return Service.get(`collection/design/${collectionId}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    updateDesign: async (collectionId: string, data: any) => {
        try {
            const token = await getUserToken()
            return Service.update({
                url: `collection/design/${collectionId}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    clientCollectionView: async (data: any) => {
        try {
            const token = await getUserToken()
            return Service.post({
                url: `client`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    downloadFile: async (data: any, id: any) => {
        try {
            const token = await getUserToken()
            return Service.downloadPost({
                url: `client/download-file/${id}`,
                data: data
            }, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    downloadCollection: async (data: any, id: any, setDownloadPer: any) => {
        try {
            const token = await getUserToken()
            return Service.downloadPost({
                url: `client/download-collection/${id}`,
                data: data,
            }, {
                authorization: token,
            }, setDownloadPer)
        } catch (error) {
            throw error
        }
    },

    addVideo: async (data: any) => {
        const token = await getUserToken()
        return Service.post({
            url: "",
            data
        }, {
            authorization: token,
        })
    }
}

export default CollectionService;