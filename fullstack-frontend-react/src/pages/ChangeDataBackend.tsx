import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { deleteDataId, getData } from "../api/controllers/controller";

import { datajournal } from "../types/journal/journal.types";

import {
    Box,
    Button,
    List,
    ListItem,
    Typography
} from "@mui/material";

const ChangeDataBackend = () => {
    const navigate = useNavigate();

    const [data, setData] = React.useState<datajournal[]>();

    useEffect(() => {
        getData()
            .then((response) => {
                setData(response.data);
            })
            .catch(e => console.log(e));
    }, []);

    const deleteRecord = (idRecord: number) => {
        deleteDataId(idRecord)
            .then((response) => {
                console.log(response);
                getData()
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch(e => console.log(e));
            })
            .catch((e) => console.log(e));
    }

    return <Box
        sx={{
            width: '400px',
            
            m: '0 auto'
        }}
    >
        <Button color="secondary"
        variant="contained"
                    onClick={() => navigate('/')}>
                        
                    Главная страница
                </Button>
        <List>
            {
                data?.map((item, key) => (
                    <ListItem
                        key={`listItem-${key}`}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            border: '1px solid #007dea',
                            color:'blue'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                component={'h3'}
                            >
                                Имя: {item.name}
                            </Typography>
                            <Typography
                                component={'h4'}
                            >
                                Возраст: {item.age}
                            </Typography>
                            <Typography component={'h4'}>
                                Почта:{item.email}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Button
                                color="success"
                                variant="outlined"
                                onClick={() => navigate(`/change-data-backend/edit/${item.id}`)}
                            >
                                Изменить
                            </Button>
                            <Button
                                color='error'
                                variant="outlined"
                                onClick={() => deleteRecord(Number(item.id))}
                                sx={{
                                    mt: 1
                                }}
                            >
                                Удалить
                            </Button>
                        </Box>
                    </ListItem>
                ))
            }
        </List>
         <Button
            variant="outlined"
            
            onClick={() => navigate('/change-data-backend/new/')}
            sx={{
                my: 1
            }}
        >
            Создать новую запись
        </Button>
    </Box>
}

export default ChangeDataBackend;