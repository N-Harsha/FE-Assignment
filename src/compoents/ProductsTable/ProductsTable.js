import ProductRow from "./ProductRow/ProductRow";

const ProductsTable = (props) => {
  const content = Object.keys(props.products).map((key) => (
    <ProductRow key={key} productName={key} productData={props.products[key]} />
  ));
  return (
    <table className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Batch</th>
          <th scope="col">Stock</th>
          <th scope="col">Deal</th>
          <th scope="col">Free</th>
          <th scope="col">MRP</th>
          <th scope="col">Rate</th>
          <th scope="col">Exp</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};
export default ProductsTable;
