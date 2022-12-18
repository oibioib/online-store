import { useQueryParam, StringParam, NumberParam } from 'use-query-params';
const MainPage = () => {
  const [s] = useQueryParam('string', StringParam);
  const [n] = useQueryParam('number', NumberParam);

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
