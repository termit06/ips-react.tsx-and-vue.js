import { createRequire } from "module";
import { searchIndexObjectDataParamId } from "../helpers/_searchDatabase";
const require = createRequire(import.meta.url)
const data = require('../../data/data.json')
export const dataApiJournal = (app) => {
    app.get('/apiJournal/', (res, req) =>{
        return res.json(data.datajournal);
    });
    app.get('apiJournal/:id', (req,res) =>{
        const idjournalDataReq = req.param.id;
        console.log('start request id:' + idjournalDataReq);

        const journaldataResponse = searchIndexObjectDataParamId(idjournalDataReq,data.datajournal)
    })
}