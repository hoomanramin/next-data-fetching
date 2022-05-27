import fs from "fs/promises";
import Link from "next/link";
import path from "path";

export default function Home(props) {
  return (
    <ul>
      {props.products.map(product => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jasonData = await fs.readFile(filePath);
  const data = JSON.parse(jasonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // redirect: {
    //   destination: "/home/events",
    // },
  };
}
