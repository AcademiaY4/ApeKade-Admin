 import React, { useState } from 'react'
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb'

export default function DisplayMyProduct() {
    const [showColors, setShowColors] = useState(false);
    const [showSizes, setShowSizes] = useState(false);
    
    const [colors, setColors] = useState([{ color: '', quantity: '' }]);
    const [sizes, setSizes] = useState([{ size: '', quantity: '' }]);
    
    const toggleColors = () => {
      setShowColors(!showColors);
    };

    const toggleSizes = () => {
      setShowSizes(!showSizes);
    };

    const addColorField = () => {
      setColors([...colors, { color: '', quantity: '' }]);
    };

    const removeColorField = (index) => {
      const updatedColors = colors.filter((_, i) => i !== index);
      setColors(updatedColors);
    };

    const handleColorChange = (index, event) => {
      const { name, value } = event.target;
      const updatedColors = colors.map((colorField, i) => 
        i === index ? { ...colorField, [name]: value } : colorField
      );
      setColors(updatedColors);
    };

    const addSizeField = () => {
      setSizes([...sizes, { size: '', quantity: '' }]);
    };

    const removeSizeField = (index) => {
      const updatedSizes = sizes.filter((_, i) => i !== index);
      setSizes(updatedSizes);
    };

    const handleSizeChange = (index, event) => {
      const { name, value } = event.target;
      const updatedSizes = sizes.map((sizeField, i) => 
        i === index ? { ...sizeField, [name]: value } : sizeField
      );
      setSizes(updatedSizes);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Colors:', colors);
      console.log('Sizes:', sizes);
    };
    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Product'} icon={'fa-sitemap'} />
                {/* row */}
                <div className="row">
                    <div className="col-md-7 col-12 mb-5">
                        <div className="card p-5">
                            <form>
                                <div className="row row-gap-4">
                                    <div className="col-md-12">
                                      <label>Product ID</label>
                                      <input type="text" disabled value="4355634525" className="form-control" placeholder="Product ID" aria-label="Product ID" required />
                                    </div>
                                    <div className="col-md-12">
                                      <label>Product Name</label>
                                      <input type="text" disabled value="Galaxy S22 Ultra 5G	" className="form-control" placeholder="Product Name" aria-label="Product Name" required />
                                    </div>
                                    <div className="col-md-12">
                                      <label>Description</label>
                                        <textarea disabled className="form-control"
                                          value="6.8-inch Dynamic AMOLED 2X display 108MP pro-grade camera with 10x optical zoom Powerful Snapdragon 8 Gen 1 processor Built-in S Pen for productivity 5000mAh battery with super-fast charging 5G connectivity for lightning-fast speeds"
                                          placeholder='Description'
                                        >
                                            
                                        </textarea>
                                    </div>
                                    <div className="col-md-12">
                                      <label>Category</label>
                                      <input type="text" disabled className="form-control" value="Elrctronic" placeholder="Product ID" aria-label="Product ID" required />
                                    </div>
                                    <div className="col-md-12">
                                      <label>Subcategory</label>
                                      <input type="text" disabled className="form-control" value="Mobile Phones" placeholder="Product Name" aria-label="Product Name" required />
                                    </div>
                                    <div className="col-md-4 ">
                                      <label>Price</label>
                                      <div className="input-group">
                                        <div class="input-group-text">LKR</div>
                                        <input
                                            type="text"
                                            maxLength={9}
                                            className="form-control"
                                            placeholder="Telephone"
                                            aria-label="Telephone"
                                            name="Telephone"
                                            value="345000"
                                            disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4 ">
                                      <label>Discount Price</label>
                                      <div className="input-group">
                                        <div class="input-group-text">LKR</div>
                                        <input
                                            type="text"
                                            maxLength={9}
                                            className="form-control"
                                            placeholder="Telephone"
                                            aria-label="Telephone"
                                            name="Telephone"
                                            value="310000"
                                            disabled
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <label>Quantity</label>
                                        <input type="text" className="form-control" placeholder="Quantity" aria-label="Quantity" value="30" disabled />
                                    </div>
                                    <h3 className='h5 mb-0 mt-2'>Attributes of Product</h3>
                                    <h3 className='h6 mb-0 mt-2'>Colors</h3>
                                    <div className="col-2">
                                      <input
                                        type="color"
                                        name="color"
                                        value="#000000"
                                        style={{ height: '100%' }}
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="text"
                                        name="colorcode"
                                        value="#000000"
                                        placeholder="Color Code"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="number"
                                        name="quantity"
                                        value="12"
                                        placeholder="Quantity"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-2">
                                      <input
                                        type="color"
                                        name="color"
                                        value="#ffffff"
                                        style={{ height: '100%' }}
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="text"
                                        name="colorcode"
                                        value="#FFFFFF"
                                        placeholder="Color Code"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="number"
                                        name="quantity"
                                        value="9"
                                        placeholder="Quantity"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-2">
                                      <input
                                        type="color"
                                        name="color"
                                        value="#000080"
                                        style={{ height: '100%' }}
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="text"
                                        name="colorcode"
                                        value="#000080"
                                        placeholder="Color Code"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <div className="col-5">
                                      <input
                                        type="number"
                                        name="quantity"
                                        value="9"
                                        placeholder="Quantity"
                                        className="form-control"
                                        disabled
                                      />
                                    </div>
                                    <h3 className='h6 mb-0 mt-2'>Sizes</h3>
                                    <label>Unavailable</label>
                                    {showColors && (
                                      <div>
                                        {colors.map((colorField, index) => (
                                          <div key={index} className="row row-gap-4" style={{position: 'relative'}}>
                                            <div className="col-2">
                                              <input
                                                type="color"
                                                name="color"
                                                value={colorField.color}
                                                onChange={(e) => handleColorChange(index, e)}
                                                style={{ height: '100%' }}
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-5">
                                              <input
                                                type="number"
                                                name="colorcode"
                                                value={colorField.color}
                                                onChange={(e) => handleColorChange(index, e)}
                                                placeholder="Color Code"
                                                className="form-control"
                                                disabled
                                              />
                                            </div>
                                            <div className="col-5">
                                              <input
                                                type="number"
                                                name="quantity"
                                                value={colorField.quantity}
                                                onChange={(e) => handleColorChange(index, e)}
                                                placeholder="Quantity"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-4">
                                              <button
                                                type="button"
                                                onClick={() => removeColorField(index)}
                                                style={{
                                                    marginLeft: '10px',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    fontSize: 20,
                                                    position: 'absolute',
                                                    top: -12,
                                                    right: 2
                                                }}
                                              >
                                                <i class="fa-solid fa-circle-xmark"></i>
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                        <div className="col-12">
                                          <button type="button" style={{width: '100%'}} className='btn btn-primary' onClick={addColorField}>
                                            Add Color
                                          </button>
                                        </div>
                                        
                                      </div>
                                    )}
                                    
                    


                                    

                                    {showSizes && (
                                      <div >
                                        {sizes.map((sizeField, index) => (
                                          <div key={index} className="row row-gap-4" style={{position: 'relative'}}>
                                            <div className="col-6">
                                              <input
                                                type="text"
                                                name="size"
                                                value={sizeField.size}
                                                onChange={(e) => handleSizeChange(index, e)}
                                                placeholder="Size"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-6">
                                              <input
                                                type="number"
                                                name="quantity"
                                                value={sizeField.quantity}
                                                onChange={(e) => handleSizeChange(index, e)}
                                                placeholder="Quantity"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-2">
                                              <button
                                                type="button"
                                                onClick={() => removeSizeField(index)}
                                                style={{
                                                    marginLeft: '10px',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    fontSize: 20,
                                                    position: 'absolute',
                                                    top: -12,
                                                    right: 2
                                                }}
                                              >
                                                <i class="fa-solid fa-circle-xmark"></i>
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                        <div className="col-12">
                                          <button type="button" style={{width: '100%'}} className='btn btn-primary' onClick={addSizeField}>
                                            Add Size
                                          </button>
                                        </div>
                                        
                                      </div>
                                    )}

                                    <br />

                                    <h3 className='h5 mb-0 mt-2'>Cover Image</h3>
                                    
                                    <div className="col-md-2">
                                        <img src="/assets/images/products/product-img-20.jpg" width={50} className='rounded img-fluid' alt="banner" />
                                    </div>
                                    <div className="col-md-10">
                                        <input type="text" disabled className="form-control" value="https://firebasestorage.googleapis.com/v0/b/233ff45d3dxc3.appspot.com/o/images%2Fexample-image.jpg?alt=media&token=fake-token-123456" placeholder="URL of Image" aria-label="URL of Image" required />
                                    </div>
                                        
                                    <div className="col-6">
                                        <button style={{width:'100%'}} className='btn btn-warning'>Edit Product</button>
                                    </div>
                                    <div className="col-6">
                                        <button style={{width:'100%'}} className='btn btn-danger'>Delete Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 offset-1 col-12 d-none d-md-block card">
                        <img src="/assets/images/products/product-img-20.jpg" className='rounded img-fluid' alt="banner" />
                    </div>
                </div>
            </div>
        </main>
    )
}
