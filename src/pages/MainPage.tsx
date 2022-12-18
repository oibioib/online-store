import { useSearchParams } from 'react-router-dom';
const MainPage = () => {
  const [params] = useSearchParams();

  const s = params.get('string');
  const n = params.get('number');
  return (
    <div>
      <h1>Main</h1>
      {!(s || n) ? <p>No query params</p> : null}
      {s ? <p>String param - {s}</p> : null}
      {n ? <p>Number param - {n}</p> : null}
    </div>
  );
};

export default MainPage;
