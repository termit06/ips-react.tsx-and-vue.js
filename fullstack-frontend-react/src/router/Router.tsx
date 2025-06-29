import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage';
import ChangeDataBackend from '../pages/ChangeDataBackend';
import Createdatabase from '../components/Create/Createdatabase';

const Router = () => {
  return (
    <Routes>
      <Route path="/" index element={<MainPage />} />
      <Route path="/change-data-backend" index element={<ChangeDataBackend />} />
       <Route path='/change-data-backend/new' element={<Createdatabase />} />
       <Route path='/change-data-backend/edit/:id' element={<Createdatabase />} />

    </Routes>
  );
};

export default Router;
