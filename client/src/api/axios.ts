import { getContentType } from "../utils/api.utils"
import axios from "axios"

export const BASE_URL = process.env.REACT_APP_BACK_URL

export const axiosRequest = axios.create({
    baseURL: BASE_URL,
    headers: getContentType()
})
