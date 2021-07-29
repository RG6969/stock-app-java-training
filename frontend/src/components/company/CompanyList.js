import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './company.css';
import { toast } from 'react-toastify';

export default function CompanyList() {

    const [loading,setLoading]=useState(true);
    const [companies,setCompanies]=useState([])
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`,config).then((res)=>{
            console.log(res);
            setCompanies(res.data);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    },[])

    const deleteCompany = async(id)=>{
        try{
            const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/company/${id}`);
            toast.success('Stock Exchange Deleted', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            ;
        }catch(err){
            console.log(err);
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        
    }

    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>):(
        <div>
            <Navbar/>
            <div className="container" style={{marginTop:'5rem'}}>
                <div className="row">
                    <div className="col">
                        <Link className="btn" to="/manage/company/add" style={{backgroundColor:'#5a5af3',color:'white'}}><i className="fa fa-upload">{'  '}Add Company</i></Link>
                    </div>
                    
                </div>
                <div className="row" style={{marginTop:'2rem'}}>
                    <div className="col">
                    <center><h4>Companies</h4></center>
                    </div>
                </div>
                {
                    companies.length === 0 ?<div></div>:(
                        <div className="row">
                    {
                        companies.map((company)=>{
                            return(
                                <div className="col-xl-12" style={{marginTop:'1.5rem'}}>
                                <div class="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <h5>{company.name} - {company.stockCode}</h5>
                                            
                                        </div>
                                        <div className="col-xl-3" style={{float:'right'}}>
                                            
                                            <Link to={`/manage/company/edit/${company.id}`} className="btn btn-warning" style={{marginLeft:'1rem',float:'right'}}><i className="fa fa-pencil"  ></i> Edit</Link>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                    
                                    <div class="card-body">
                                        <h5 class="card-title">{}</h5>
                                        <p class="card-text">{company.description}</p>
                                        <hr></hr>
                                        <p class="card-text">Turnover - {company.turnover}</p>
                                        <h5 class="badge badge-dark">Sector - {company.sector ? company.sector.name : " "}</h5>
                                        
                                    </div>
                                    <div className="card-footer">
                                        CEO - {company.ceo}
                                    </div>
                                    <div className="card-footer">
                                        {company.boardOfDirectors.split(",").map((director)=>{
                                            return(
                                                <div className="badge badge-success" style={{marginRight:'1rem'}}><i className="fa fa-user-o"></i>{' '}{director}</div>
                                            )
                                        })}
                                        <Link to={`/manage/company/connect-sector/${company.id}`} className="btn btn-success" style={{float:'right'}}>Choose Sector</Link>
                                        <Link to={`/manage/company/connect-stock-exchange/${company.id}`} className="btn btn-success" style={{float:'right',marginRight:'1rem'}}>Choose Stock Exchnage</Link>
                                    </div>
                                    </div>
                                    </div>
                            )
                        })
                    }
                
                </div>
                    )
                }
                
            
            </div>
        </div>
    )
}
