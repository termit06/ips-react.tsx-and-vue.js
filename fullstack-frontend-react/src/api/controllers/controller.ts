import { $api, config } from "../index";
import { dataDto } from "../../types/common/data.types";

export const getCommon = () => {
    return $api.get('/apiJournal', { headers: config() });
}

export const getData = () => {
    return $api.get('/apiJournal/data/', { headers: config() });
}

export const getDataId = (id: number) => {
    return $api.get(`/apiJournal/data/${id}`, { headers: config() });
}

export const createData = (body: dataDto) => {
    return $api.post(`/apiJournal/data/`, body, { headers: config() });
}

export const editDataId = (id: number, body: dataDto) => {
    return $api.put(`/apiJournal/data/${id}`, body, { headers: config() });
}

export const deleteDataId = (id: number) => {
    return $api.delete(`/apiJournal/data/${id}`, { headers: config() });
}