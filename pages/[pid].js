import fs from "fs/promises";
import path from "path";
const ProductDetails = props => {
  // if (!props.product[0]) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <>
      <h1 key={props.product[0].id}>{props.product[0].title}</h1>
      <p>descriptions</p>
    </>
  );
};

export async function getStaticProps(context) {
  const {params} = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jasonData = await fs.readFile(filePath);
  const data = JSON.parse(jasonData);
  const filterdData = data.products.filter(item => item.id === productId);
  return {
    props: {
      product: filterdData,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{params: {pid: "p1"}}, {params: {pid: "p2"}}],
    fallback: "blocking",
  };
}
export default ProductDetails;
