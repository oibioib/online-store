import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';

import '@fontsource/inter';
import './App.css';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import muiThemeSettings from './theme/Theme';

function Layout() {
  return (
    <ThemeProvider theme={muiThemeSettings}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap="8px"
        padding={1}
        direction="column">
        <Header />
        <Outlet />
      </Grid>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
