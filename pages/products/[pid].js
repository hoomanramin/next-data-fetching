import fs from "fs/promises";
import path from "path";
const ProductDetails = props => {
  // if (!props.product[0]) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <>
      <h1 key={props.product.id}>{props.product.title}</h1>
      <p>descriptions</p>
    </>
  );
};

export default ProductDetails;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jasonData = await fs.readFile(filePath);
  const data = JSON.parse(jasonData);
  return data;
}

export async function getStaticProps(context) {
  const {params} = context;
  const productId = params.pid;
  const data = await getData();
  const filterdData = data.products.find(item => item.id === productId);
  if (!filterdData) {
    return {notFound: true};
  }
  return {
    props: {
      product: filterdData,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(item => item.id);
  const pathsParams = ids.map(id => ({params: {pid: id}}));
  return {
    paths: pathsParams,
    fallback: "blocking",
  };
}
