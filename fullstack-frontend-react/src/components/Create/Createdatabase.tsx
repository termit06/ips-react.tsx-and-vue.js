import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { Box, Button, TextField, Typography } from "@mui/material";
import { createData, editDataId, getDataId } from "../../api/controllers/controller";
const Createdatabase = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState(0);
    const [email, setEmail] = React.useState('');

    useEffect(() => {
        if (id) {
            getDataId(+id)
                .then((response) => {
                    setName(response.data.name);
                    setAge(response.data.age);
                    setEmail(response.data.email);
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    const processingRequest = () => {
        const data = {
            name: name,
            age: age,
            email: email
        }

        id ?
            editDataId(+id, data)
                .then(() => {
                    navigate(-1);
                })
                .catch((e) => console.log(e))
            :
            createData(data)
                .then(() => {
                    navigate(-1);
                })
                .catch((e) => console.log(e))
    }
    return <Box
        sx={{
            width: '260px',
            margin: '0 auto'
        }}>
        <Box
            component="section"
            sx={{ p: 2, border: '1px dashed grey' }}
        >
            <Typography>
                Name:
            </Typography>
            <TextField value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
                mb: 2
            }}/>
            <Typography>
                Age:
            </Typography>
            <TextField  value={age === 0 ? '' : age}
            type="number"
            onChange={(e) => setAge(+e.target.value)}/>
            <Typography>
                Почта:
            </Typography>
            <TextField value={email}
            onChange={(e) => setEmail(e.target.value)}
                sx={{
                    mb:3
                }}
                />
                <Button
                variant="outlined"
                onClick={processingRequest}
            sx={{
                display: 'block',
                mt: 4
            }}
                >
                {id ? `Редактировать запись` : `Создать новую запись`}
                </Button>
                <Button
                    variant="outlined"
                    color='error'
                    onClick={() => navigate('/change-data-backend')}
                    sx={{mt: 4}}
                    >
                      Отмена
                    </Button>
        </Box>
    </Box>
}
export default Createdatabase;

