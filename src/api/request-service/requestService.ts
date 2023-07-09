import Service from "../../Lib/service";
import { buildQuery, getUserToken } from "../../Utils/helper";
import axios, { AxiosRequestConfig } from "axios";

const RequestService = {
  getAgents: async (params: any) => {
    try {
      const token = getUserToken();
      const query = buildQuery(params);
      return Service.get(`agent/list-agents?${query}`, {
        authorization: token,
      });
    } catch (error) {
        console.log(error);
    }
  },

  getFavouriteAgents: async (params: any) => {
    try {
      const token = getUserToken();
      const query = buildQuery(params);
      return Service.get(`agent/list-favourite-agents?${query}`, {
        authorization: token,
      });
    } catch (error) {
        console.log(error);
    }
  },

  getAgentsLocations: async (params: any) => {
    try {
      const token = getUserToken();
      const query = buildQuery(params);
      return Service.get(`agent/list-agents-locations?${query}`, {
        authorization: token,
      });
    } catch (error) {
        console.log(error);
    }
  },

  getAgentById: async (id: number|string) => {
    try{
        const token = getUserToken();
        return Service.get(`agent/get-agent-detail/${id}`,{
            authorization: token,
        })
    } catch (error) {
        console.log(error);
    }
  },

  getAgentCategoryById: async (id: number|string) => {
    try{
        const token = getUserToken();
        return Service.get(`agent/get-agent-categories/${id}`,{
            authorization: token,
        })
    } catch (error) {
        console.log(error);
    }
  },

  getAgentReviewsById:async (id: number|string) => {
    try{
      const token = getUserToken();
        return Service.get(`agent/get-agent-reviews/${id}`,{
            authorization: token,
        })
    } catch(error){
      console.log(error);
    }
  },

  addToFavourite:async (id: number, isFavourite: number) => {
    try{
      const token = getUserToken();
        return Service.get(`agent/favourite/${id}?isFavourite=${isFavourite}`,{
            authorization: token,
        })
    } catch(error){
      console.log(error);
    }
  },

  // location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        const success = (location: any) => {
          resolve(location.coords);
        };
        const error = async (err?: any) => {
          console.log(err);
          let response = await axios.get("http://ip-api.com/json/");
          resolve({latitude : response.data.lat, longitude: response.data.lon});
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
          error();
        }
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  },
};

export default RequestService;
