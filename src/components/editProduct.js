import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { update } from '../features/sliceProducts';
import {
  getProducts,
  productSelector,
  updateProduct,
} from "../features/sliceProducts";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // flow :
  // dari AddPro duct kita mendispatch function update
  // artinya kita mengirim data dari komponen ini ke redux store
  // kemudian dari redux store dapat digunakan oleh komponen yg butuh datanya

  // const updateProduct = (e) => {
  //     //agar ketika submit form page tidak reload
  //     e.preventDefault()
  //     //dispacth action pada product slice
  //     // untuk mengirim payload title, price
  //     dispatch(update({title, price}))

  // }

  //setelah data data dari getproduct denagn useEffect
  //ambil data single product dengan id dari param id (var id)
  const product = useSelector((state) => productSelector.selectById(state, id));

  //kemudian saat pertama kali komponen dirender
  //data yang ada pada var product akan di set ke statenya
  //dengan use effect #2

  //#1
  useEffect(() => {
    //mendispacth func getproduct agar dapat data dari redux store
    dispatch(getProducts());
  }, [dispatch]);

  //#2
  useEffect(() => {
    if(product){
        setTitle(product.title)
        setPrice(product.price)
    }
  }, [product]);

  const handleUpdate = async(e) => {
    e.preventDefault()
    await dispatch(updateProduct({id, title, price}))
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleUpdate} className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
