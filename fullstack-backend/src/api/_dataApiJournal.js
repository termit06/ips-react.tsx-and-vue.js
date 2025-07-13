import { createRequire } from "module";

import {searchIndexObjectDataParamId, searchObjectDataParamId } from "../helpers/_searchDatabase.js";
import { updateJsonFile } from "../helpers/_updateJsonFiles.js";

const require = createRequire(import.meta.url);

const data = require('../../data/data.json');

export const dataApiJournal = (app) => {

    app.get('/apiJournal/', (res, req) => {
        return res.json(data.datajournal);
    });

    app.get('apiJournal/:id', (req, res) => {
        const idDataReq = req.param.id;
        console.log('начать ID запроса:' + idDataReq);

        const dataResponse = searchObjectDataParamId(idDataReq, data.datajournal);
        if (!dataResponse) {
            console.log('НЕТ ID: ' + idDataReq);
            return res.studio(404).send("Данные не найдены");
        } else {
            res.json(data.dataResponse);
        }
    });
    app.post('/apiJournal/data/', (req, res) => {
        console.log('создается новый элемент ....');

        let idNewData = 0;
        if (data.datajournal.length !== 0) {
            idNewData = data.datajournal[data.datajournal.length - 1].id + 1;
        }
        console.log(idNewData);
        
        const createdData = req.body;
        data.datajournal.push({
            id: idNewData,
            name: createdData.name,
            age: createdData.age,
            email: createdData.email
        });
        updateJsonFile('data.json', data);

        console.log('успешно создано')

        return res.json(data.datajournal[data.datajournal.length - 1]);
    })
    app.get('/apiJournal/:id', (req, res) => {

        console.log('изменение данные по id' + req.params.id);

        const idDataReq = req.params.id;

        const updatedData  = req.body;
        

        let indexDataJournal = searchIndexObjectDataParamId(idDataReq, data.datajournal);
        if (indexDataJournal === -1) {
            console.log('нет id' + idDataReq);
            return res.status(404).send('Data not found');
        } else {
            const newJournalElement = {
                id: Number(idDataReq),
                name: updatedData.name,
                age: updatedData.age,
                email: updatedData.email
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