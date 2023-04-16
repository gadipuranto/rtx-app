import React, { useEffect } from "react";
//untuk memanggil state dari store.js gunakan useSelector
// untuk menggunakan data dari redux store
// bisa dengan hook useSelector dari react-redux
import { useSelector, useDispatch } from "react-redux";
import { getProducts,deleteProduct, productSelector } from "../features/sliceProducts";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  //   const {title, price} = useSelector(state => state.product)

  const dispatch = useDispatch(getProducts);
  const products = useSelector(productSelector.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="box mt-5">
      <Link className="button is-success" to="add">Add New</Link>
      <table className="table is-stripped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>TItle</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map( (product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`edit/${product.id}`} className="button is-info is-small">Edit</Link>
                <button onClick={()=> dispatch(deleteProduct(product.id))} className="button is-danger is-small ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
