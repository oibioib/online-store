import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import MainPage from './components/MainPage';
import CartPage from './components/CartPage';
import ProductPage from './components/ProductPage';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';

import '@fontsource/inter';
import './App.css';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['"Inter"', '"Roboto"', 'sans-serif'].join(','),
    },
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap="8px"
        padding={1}
        direction="column">
        <Header />
        <Grid container component={Outlet}></Grid>
        {/* <Outlet /> */}
      </Grid>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </QueryParamProvider>
    </Router>
  );
}

export default App;
