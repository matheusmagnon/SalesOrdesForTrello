import "./styles/index.css";

import { api, params } from "../lib/axios";

import { useEffect, useState } from "react";
import Form from "./components/Form";
import { SalesOrderProvider } from "./context/SalesOrderContext";

function App() {
  // const [dataFetch, setDataFetch] = useState<any>([]);

  // const { apikey, Authorization } = params;

  // const fetchUserData = () => {
  //   api
  //     .get("https://wnsxretzoexjewupnzef.supabase.co/rest/v1/Orders?select=*", {
  //       headers: params,
  //     })
  //     .then((response) => {
  //       setDataFetch(response.data);
  //     });
  // };
  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  // console.log(dataFetch);

  return (
    <SalesOrderProvider>
      <div>
        <Form />
      </div>
    </SalesOrderProvider>
  );
}

export default App;
