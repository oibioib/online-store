import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, CartPage, ProductPage, ErrorPage } from './pages';
import { Layout } from './layouts';
import TempPageWithUIElements from './theme/TempPageWithUIElements';
import { useEffect, useState } from 'react';
import { Product } from './types/ProductTypes';
import { getProducts } from './services/ProductsApi';
import { productsContext } from './Context/Context';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const { Provider } = productsContext;

  useEffect(() => {
    (async () => {
      const result = await getProducts();
      if (result) {
        setProducts(result);
      }
    })();
  }, []);

  return (
    <>
      <Provider value={products}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/ui" element={<TempPageWithUIElements />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
