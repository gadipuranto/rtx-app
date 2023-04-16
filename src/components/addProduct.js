import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../features/sliceProducts";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // flow :
  // dari AddProduct kita mendispatch function update
  // artinya kita mengirim data dari komponen ini ke redux store
  // kemudian dari redux store dapat digunakan oleh komponen yg butuh datanya

  // const updateProduct = (e) => {
  //     //agar ketika submit form page tidak reload
  //     e.preventDefault()
  //     //dispacth action pada product slice
  //     // untuk mengirim payload title, price
  //     dispatch(update({title, price}))

  // }

  const createProduct = async (e) => {
    e.preventDefault();
    await dispatch(saveProduct({ title, price }));
    navigate("/");
  };

  return (
    <div>
      {/* <form onSubmit={updateProduct} className='box mt-5'> */}
      <form onSubmit={createProduct} className="box mt-5">
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
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
