import React, { useState } from 'react'
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb'

export default function EditMyProduct() {
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
                <BreadCrumb page={'Edit Product'} icon={'fa-sitemap'} />
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
                                        <input type="text" className="form-control" placeholder="Product Name" aria-label="Product Name" required />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea className="form-control" placeholder='Description'></textarea>
                                    </div>
                                    <div className="col-12">
                                        <select className="form-select">
                                            <option selected>Select Category</option>
                                            <option value={1}>Elrctronic</option>
                                            <option value={2}>Home Appliances</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <select className="form-select">
                                            <option selected>Select Subcategory</option>
                                            <option value={1}>Mobile Phones</option>
                                            <option value={2}>Tablets</option>
                                            <option value={3}>Laptops</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" placeholder="Original Price" aria-label="Original Price" required />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" placeholder="Discount Price" aria-label="Discount Price" required />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" placeholder="Quantity" aria-label="Quantity" value="30" disabled />
                                    </div>
                                    <h3 className='h5 mb-0 mt-2'>Add Attributes of Product</h3>
                                    <div>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={showColors}
                                          onChange={toggleColors}
                                          className="form-check-input"
                                        />
                                        &nbsp;Colors
                                      </label>
                                    </div>

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
                                                type="text"
                                                name="colorcode"
                                                onChange={(e) => handleColorChange(index, e)}
                                                placeholder="Color Code"
                                                className="form-control"
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
                                    
                    


                                    <div>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={showSizes}
                                          onChange={toggleSizes}
                                          className="form-check-input"
                                        />
                                        &nbsp;Sizes
                                      </label>
                                    </div>

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

                                    <h3 className='h5 mb-0 mt-2'>Upload Image</h3>
                                    
                                    <div className="col-md-6">
                                        <input type="file" className="form-control" placeholder="Original Price" aria-label="Original Price" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" disabled className="form-control" value="https://firebasestorage.googleapis.com/v0/b/233ff45d3dxc3.appspot.com/o/images%2Fexample" placeholder="URL of Image" aria-label="URL of Image" required />
                                    </div>
                                        
                                    <div className="col-12 text-end">
                                        <button className='btn btn-primary'>Add Product</button>
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
