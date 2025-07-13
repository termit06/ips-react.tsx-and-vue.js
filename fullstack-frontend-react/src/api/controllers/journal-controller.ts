import { $api, config } from "../index";
import { datajournal } from "../../types/journal/journal.types";

export const getCommon = () => {
    return $api.get('/apiJournal', { headers: config() });
}

export const getData = () => {
    return $api.get('/apiJournal/data/', { headers: config() });
}

export const getDataId = (id: number) => {
    return $api.get(`/apiJournal/data/${id}`, { headers: config() });
}

export const createData = (body: datajournal) => {
    return $api.post(`/apiJournal/data/`, body, { headers: config() });
}

export const editDataId = (id: number, body: datajournal) => {
    return $api.put(`/apiJournal/data/${id}`, body, { headers: config() });
}

export const deleteDataId = (id: number) => {
    return $api.delete(`/apiJournal/data/${id}`, { headers: config() });
}