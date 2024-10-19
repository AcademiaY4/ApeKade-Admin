import React, { useState, useEffect } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import { Link, useNavigate } from 'react-router-dom'
import StockService from '../../../../Services/InventoryService/StockService';
import stockHeader from '../../../../Utils/Pdfs/StockHeader';
import StockSwal from '../../../../Utils/Swal/StockSwal';
import ProductSwal from '../../../../Utils/Swal/ProductSwal';
import Toaster from '../../../../Utils/Toaster/Toaster';
import ProductService from '../../../../Services/Product/ProductService';

export default function Stocks() {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [totalStocks, setTotalStocks] = useState()
  const [searchTerm, setSearchTerm] = useState('');
  

  const navigateToDisplayStocks = (id) => {
    navigation(`/app/admin/stocks/displayStocks/${id}`)
  }

  const navigateToDisplayProduct = (id) => {
      navigation(`/app/vendor/products/displayProduct/${id}`)
  }

  const handleDeleteStock = async (id) => {
    ProductSwal.deleteConfiramation(async () => {
            Toaster.loadingToast('Deleting Stock')
            try {
                const result = await StockService.deleteStock(id);
                /*if (result) {
                    const stockResult = await ProductService.deleteProduct(id);
                    Toaster.justToast('success', "Product Deleted", () => { });
              }*/
              Toaster.justToast('success', "Stock Deleted", () => { });
            } catch (error) {
                alert(error)
                // ResponseHandler.handleResponse(error);
            } finally {
                fetchAllProducts();
                Toaster.dismissLoadingToast()
            }
        });
  };

  const fetchAllStocks = async () => {
    try {
      setLoading(true)
      const result = await StockService.getAllStocks();
      if (result.data.Status) {
        console.log(result.data.Data)
        setTotalStocks(result.data.Data.length)
        setStocks(result.data.Data)
      }
    } catch (error) {
      alert(error)
  } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
      fetchAllStocks()
  }, [])
  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
  };
  const filteredStocks = stocks.filter(stock =>
    (
      stock.Category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const generatePdf = () => {
    Toaster.loadingToast('Generating Pdf')
    try {
        PdfGenerator.generatePdf(stocks, "All Stocks", stockHeader)
        Toaster.justToast('success', 'Creating The Pdf For You', () => { })
    } catch (error) {
        Toaster.justToast('error', 'genration failed', () => { })
    } finally {
        Toaster.dismissLoadingToast()
    }
  }
  
  return (
    <main className="main-content-wrapper">
      <div className="container">
        {/* row */}
        <BreadCrumb page={'Stocks'} icon={'fa-sitemap'}/>
        <div className="row">
          <div className="col-xl-12 col-12 mb-5">
            {/* card */}
            <div className="card h-100 card">
              <div className="p-6">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="col-md-4 col-12">
                      {/* form */}
                      <form className="d-flex" role="search">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search Users"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                      </form>
                  </div>
                  {/* select option */}
                  <div className="d-flex justify-content-around align-items-center gap-3">
                    <button className='btn btn-danger' onClick={() => { generatePdf() }}>Export PDF</button>
                  </div>
                </div>
            </div>
            {/* card body */}
            <div className="card-body p-0">
              {/* table */}
              <div className="table-responsive">
                <table className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
                  <thead className="bg-light">
                    <tr>
                      <th>Stock ID</th>
                      <th>Proudct</th>
                      <th>Subcategory</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Is Stock Low</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                    <tbody>
                      {filteredStocks.length > 0 ? (
                        filteredStocks.map((stock) => (
                            <tr key={stock.Id}>
                                <td>{ stock.Id }</td>
                                <td><Link onClick={()=>{navigateToDisplayProduct(stock.ProductId)}} style={{ textDecoration:'underline' }}>See Product</Link></td>
                                <td>
                                    { stock.SubCategory }
                                </td>
                                <td>
                                    { stock.Category }
                                </td>
                                <td>
                                    { stock.Quantity }
                                </td>
                                <td>
                                  <span className="badge bg-light-primary text-dark-primary">In Stock</span>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => { handleDeleteStock(stock.Id) }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td></td>
                        </tr>
                    )}
                      
                    </tbody>
                  </table>
                </div>
              </div>
              <Paginator/>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}
