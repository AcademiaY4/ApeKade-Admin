import React, { useState } from 'react'
import BreadCrumb from '../../../../Components/BreadCrumb/BreadCrumb'
import Paginator from '../../../../Components/Paginator/Paginator'
import { Link, useNavigate } from 'react-router-dom'
import StockService from '../../../../Services/InventoryService/StockService';
import stockHeader from '../../../../Utils/Pdfs/StockHeader';

export default function Stocks() {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [totalStocks, setTotalStocks] = useState()
  const [searchTerm, setSearchTerm] = useState('');

  const navigateToDisplayStocks = () => {
    navigation('/app/admin/stocks/displayStocks')
  }

  const handleDeleteStock = async (id) => {
        
  };

  const fetchAllStocks = async () => {
    try {
      setLoading(true)
      const result = await StockService.getAllStocks();
      if (result.data.status) {
        setTotalStocks(result.data.data.stocks.length())
        setStocks(result.data.data.stocks)
      }
    } catch (error) {
      alert(error)
  } finally {
      setLoading(false)
    }
  }

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
                          <input className="form-control" type="search" placeholder="Search Stocks" aria-label="Search" />
                      </form>
                  </div>
                  {/* select option */}
                  <div className="d-flex justify-content-around align-items-center gap-3">
                    <button className='btn btn-danger' onClick={() => { generatePdf() }}>Export PDF</button>
                    <button className='btn btn-dark'>Add New</button>
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
                      <tr>
                        <td><a className="text-reset">6875443123456</a></td>
                        <td><Link style={{ textDecoration:'underline' }}>6875443123456</Link></td>
                        <td>Mobile Phones</td>
                        <td>Electronics</td>
                        <td>30</td>
                        <td>
                          <span className="badge bg-light-primary text-dark-primary">In Stock</span>
                        </td>
                        <td>
                          <button className="btn btn-primary me-3" >
                            More
                          </button>
                          <button className="btn btn-danger" >
                            Delete
                          </button>
                        </td>
                      </tr>
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
