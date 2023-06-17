import Service from "../../Lib/service"
import { getUserToken } from "../../Utils/helper"

const DashboardService = {
    getSummary: async () => {
        try {
            const token = getUserToken()
            return Service.get('dashboard/summary', {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    getRecentCustomer: async () => {
        try {
            const token = getUserToken()
            return Service.get('dashboard/recent-customers', {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    getUpComingBookings: async (currentDate: any) => {
        try {
            const token = getUserToken()
            return Service.get(`dashboard/upcoming-bookings?date=${currentDate}`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    },
    getUserStorage: async () => {
        try {
            const token = getUserToken()
            return Service.get(`client/get-remaining-space`, {
                authorization: token,
            })
        } catch (error) {
            throw error
        }
    }
}

export default DashboardService