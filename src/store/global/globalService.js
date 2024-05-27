import axios from "axios";

import { API_URL } from '@env';


// get sessions
const getSessions = async () => {

    const response = await axios.get(API_URL+'/sessions/infos')
    return response.data
}
// get volumetrie
const getVolumetrie = async () => {

    const response = await axios.get(API_URL+'/infos/volumetrie')
    return response.data
}
const globalService = {
    getSessions,
    getVolumetrie
}


export default globalService