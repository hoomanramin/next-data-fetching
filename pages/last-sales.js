import {useEffect, useState} from "react";

const LastSale = () => {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://nextjs-course-f2bbf-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    )
      .then(res => res.json())
      .then(data => {
        const transformData = [];
        for (const key in data) {
          transformData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformData);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p>There is no data yet</p>;
  }
  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSale;
