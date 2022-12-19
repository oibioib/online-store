import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, CartPage, ProductPage, ErrorPage } from './pages';
import { Layout } from './layouts';
import TempPageWithUIElements from './theme/TempPageWithUIElements';

function App() {
  return (
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
  );
}

export default App;
