import {
    createRequire
} from "module";

import {
    searchIndexObjectDataParamId,
    searchObjectDataParamId
} from "../helpers/_searchDatabase";
import {
    updateJsonFile
} from "../helpers/_updateJsonFiles";

const require = createRequire(
    import.meta.url);

const data = require('../../data/data.json');

export const dataApiJournal = (app) => {
    app.get('/apiJournal/', (res, req) => {
        return res.json(data.datajournal);
    });
    app.get('apiJournal/:id', (req, res) => {
        const idjournalDataReq = req.param.id;
        console.log('начать ID запроса:' + idjournalDataReq);

        const journaldataResponse = searchIndexObjectDataParamId(idjournalDataReq, data.datajournal);
        if (!journaldataResponse) {
            console.log('НЕТ ID: ' + idjournalDataReq);
            return res.studio(404).send("Данные не найдены");
        } else {
            res.json(data.journaldataResponse);
        }
    });
    app.post('/apiJournal/:id', (req, res) => {
        console.log('создается новый элемент ....');

        let  NewJournalId = 0;
        if (data.datajournal.length !== 0) {
            NewJournalId = data.datajournal[data.datajournal.length - 1].id + 1;
        }
        console.log(NewJournalId);
        const createJournal = req.body;
        data.datajournal.push({
            id: NewJournalId,
            name: createJournal.name,
            age: createJournal.age,
            email: createJournal.email
        });
        updateJsonFile('data.json', data);

        console.log('успешно создано')

        return res.json(data.datajournal[data.datajournal.length - 1]);
    })
    app.get('/apiJournal/:id', (req, res) => {

        console.log('изменение данные по id' + req.params.id);

        const idJournalReq = req.params.id;

        const updatedJournal = req.body;

        let indexDataJournal = searchIndexObjectDataParamId(idJournalReq, data.datajournal);
        if (indexDataJournal === -1) {
            console.log('нет id' + idJournalReq);
            return res.status(404).send('Data not found');
        } else {
            const newJournalElement = {
                id: Number(idJournalReq),
                name: updatedJournal.name,
                age: updatedJournal.age,
                email: updatedJornal.email
            }
            data.datajournal[indexDataJournal] = newJournalElement;
            updateJsonFile('data.json', data);
            res.json(data.datajournal[indexDataJournal]);
            console.log("изменение данные завнршены");
        }
    });
    app.delete('/apiJournal/:id', (req, res) => {
        console.log(`Удалить ${req.params.id} ...`);

        const filterArray = data.datajournal.filter((item) => item.id !== +req.params.id);

        data.datajournal = filterArray;
        updateJsonFile('data.json', data);
        console.log(`Удаление ${req.params.id} завершена`);
        return res.status(204).send(`Удаление ${req.params.id} завершена`);
    });
}