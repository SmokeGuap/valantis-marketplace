import {
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';

import { MainPage } from 'src/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainPage />} />
      <Route path='/:slug' element={<MainPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </>
  )
);

export default router;
