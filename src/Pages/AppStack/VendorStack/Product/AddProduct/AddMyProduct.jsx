import React, { useState, useEffect } from 'react'
import BreadCrumb from '../../../../../Components/BreadCrumb/BreadCrumb'
import { storage } from '../../../../../Utils/firebase/firebaseConfig';  
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage';
import { useFormik } from 'formik';
import LocalStore from '../../../../../Store/LocalStore'
import ProductService from '../../../../../Services/Product/ProductService';
import StockService from '../../../../../Services/InventoryService/StockService';
import CategoryService from '../../../../../Services/InventoryService/CategoryService';

export default function AddMyProduct() {
    const user = LocalStore.getUser()
    const [showColors, setShowColors] = useState(false);
    const [showSizes, setShowSizes] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    
    const [colors, setColors] = useState([{ ColorCode: '', Quantity: 0 }]);
    const [sizes, setSizes] = useState([{ SizeString: '', Quantity: 0 }]);
    
    const fetchAllCategories = async () => {
      try {
        setLoading(true)
        const result = await CategoryService.getAllCategories()
        if (result.data.Status) {
            setCategories(result.data.Data)
        }
      } catch (error) {
          alert(error)
      } finally {
          setLoading(false)
      }
    }
    useEffect(() => {
        fetchAllCategories()
    }, [])
    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
    };
    
    const toggleColors = () => {
      setShowColors(!showColors);
    };

    const toggleSizes = () => {
      setShowSizes(!showSizes);
    };

    const addColorField = () => {
      setColors([...colors, { ColorCode: '', Quantity: 0 }]);
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
      setSizes([...sizes, { SizeString: '', Quantity: 0 }]);
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
    
    const { values, handleChange, handleSubmit } = useFormik({
      initialValues: {
        Name: '',
        Price: 0.0,
        Discount: 0.0,
        Description: '',
        Quantity: 0,
        ImageUrl: '',
        Category: '',
        SubCategory: '',
        Brand: '',
        VendorID: '',
        Colors: [],
        Sizes: [],
      },
      onSubmit: async (values) => {
        try {
          // Handle image upload
          if (imageFile) {
            const imageRef = ref(storage, `products/${user.Id}/${values.Name}`);
            const uploadResult = await uploadBytes(imageRef, imageFile);
            const downloadUrl = await getDownloadURL(uploadResult.ref);
            setImageUrl(downloadUrl);
            values.ImageUrl = downloadUrl;  // Add image URL to form values
          }

          // Add colors and sizes to values
          values.Colors = colors;
          values.Sizes = sizes;
          values.VendorID = user.Id

          console.log("Values:", values)

          // Now send all data to backend API
          const result = await ProductService.createProduct(values); // Assuming you have a ProductService
          console.log("Product created:", result);
          if (result.data.Code === 201) {
            const stockValues = {
              ProductId: result.data.Data.ProductId,
              SubCategory: values.SubCategory,
              Category: values.Category,
              Quantity: values.Quantity
            }
            const stockResult = await StockService.createStrock(stockValues);
            if (stockResult.data.Code == 201) {
              alert('Stock and Product added successfully!');
            }
          } else {
            alert('Product added successfully!');
          }
        } catch (error) {
          console.error('Error adding product:', error);
        }
      },
    });

    return (
        <main className="main-content-wrapper pb-6 px-0 px-md-4 pt-14">
            <div className="container">
                <BreadCrumb page={'Add Product'} icon={'fa-sitemap'} />
                {/* row */}
                <div className="row">
                    <div className="col-md-7 col-12 mb-5">
                        <div className="card p-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row row-gap-4">
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" value={values.Name} onChange={handleChange} name='Name' placeholder="Product Name" aria-label="Product Name" required />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea className="form-control" value={values.Description} onChange={handleChange} name='Description' placeholder='Description'></textarea>
                                    </div>
                                    <div className="col-12">
                                    <select 
                                        className="form-select" 
                                        value={values.Category} 
                                        onChange={handleChange} 
                                        name="Category"
                                    >
                                        <option value="" disabled selected>Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.Id} value={category.CategoryName}>
                                                {category.CategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 mt-3">
                                    <select 
                                        className="form-select" 
                                        value={values.SubCategory} 
                                        onChange={handleChange} 
                                        name="SubCategory"
                                    >
                                        <option value="" disabled selected>Select Subcategory</option>
                                        {categories
                                            .filter((category) => category.CategoryName === values.Category)
                                            .flatMap((category) => category.SubCategories)
                                            .map((subCategory) => (
                                                <option key={subCategory.Id} value={subCategory.SubCategoryName}>
                                                    {subCategory.SubCategoryName}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value={values.Price} onChange={handleChange} name='Price' placeholder="Original Price" aria-label="Original Price" required />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value={values.Discount} onChange={handleChange} name='Discount' placeholder="Discount" aria-label="Discount" required />
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" value={values.Quantity} onChange={handleChange} name='Quantity' placeholder="Quantity" aria-label="Quantity"  />
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
                                                name="ColorCode"
                                                value={colorField.ColorCode}
                                                onChange={(e) => handleColorChange(index, e)}
                                                style={{ height: '100%' }}
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-5">
                                              <input
                                                type="number"
                                                name="ColorCode"
                                                value={colorField.ColorCode}
                                                onChange={(e) => handleColorChange(index, e)}
                                                placeholder="Color Code"
                                                className="form-control"
                                                disabled
                                              />
                                            </div>
                                            <div className="col-5">
                                              <input
                                                type="number"
                                                name="Quantity"
                                                value={colorField.Quantity}
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
                                                name="SizeString"
                                                value={sizeField.SizeString}
                                                onChange={(e) => handleSizeChange(index, e)}
                                                placeholder="Size"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="col-6">
                                              <input
                                                type="number"
                                                name="Quantity"
                                                value={sizeField.Quantity}
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
                                        <input type="file" className="form-control" onChange={handleImageChange} placeholder="Original Price" aria-label="Original Price" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="hidden" disabled className="form-control" placeholder="URL of Image" aria-label="URL of Image" required />
                                    </div>
                                        
                                    <div className="col-12 text-end">
                                        <button type='submit' className='btn btn-primary'>Add Product</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3 offset-1 col-12 d-none d-md-block card">
                        <img src="/assets/images/banner/product.png" className='rounded img-fluid' alt="banner" />
                    </div>
                </div>
            </div>
        </main>
    )
}
