import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const PokemonAPI = {
    get: async function (name, cancel = false) {
        const response = await api.request({
            url: `/pokemon/${name}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },
    getPaginated: async function ({ limit, offset }, cancel = false) {
        const response = await api.request({
            url: "/pokemon/",
            method: "GET",
            params: {
                limit: limit,
                offset: offset,
            },
            signal: cancel ? cancelApiObject[this.getPaginated.name].handleRequestCancellation().signal : undefined,
        })

        return response.data.results
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(PokemonAPI)
