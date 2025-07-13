import { useNavigate } from "react-router-dom";

import {
  Box,
  Button
} from "@mui/material";

const MainPage = () => {
  const navigate = useNavigate();

  return <Box
    sx={{
      width: '1200px',
      m: '0 auto'
    }}
  >
    <Button
      variant='outlined'
      color='error'
      onClick={() => navigate('/change-data-backend')}
    >
      Server
    </Button>
  </Box>
};

export default MainPage;