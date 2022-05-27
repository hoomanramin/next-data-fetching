import {useEffect, useState} from "react";
import useSWR from "swr";

const LastSale = props => {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const [sales, setSales] = useState(props.sales);
  const [loading, setLoading] = useState(false);
  const url =
    "https://nextjs-course-f2bbf-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json";
  const {data, error} = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      const transformData = [];
      for (const key in data) {
        transformData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformData);
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       const transformData = [];
  //       for (const key in data) {
  //         transformData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformData);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>There is no data yet</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales?.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
      {/* {props.sales?.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))} */}
    </ul>
  );
};

export const getStaticProps = async ctx => {
  const res = await fetch(
    "https://nextjs-course-f2bbf-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await res.json();

  const transformData = [];
  for (const key in data) {
    transformData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformData,
    },
    // revalidate: 10,
  };
};

export default LastSale;
