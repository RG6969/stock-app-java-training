import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './ipo.css';
import { toast } from 'react-toastify';

export default function ListIpo() {
    const [loading,setLoading]=useState(true);
    const [ipos,setIpos]=useState([]);


    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ipos`,config).then((res)=>{
            console.log(res);
            setIpos(res.data);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    },[])

    const getDate = (date) => {
        const data = new Date(date);
        return data.toDateString();
    }
    const getTime = (date) => {
        const data = new Date(date);
        return data.toTimeString();
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
                        <Link className="btn" to="/manage/ipo/add" style={{backgroundColor:'#5a5af3',color:'white'}}><i className="fa fa-upload">{'  '}Add IPO</i></Link>
                    </div>
                    
                </div>
                <div className="row" style={{marginTop:'2rem'}}>
                    <div className="col">
                    <center><h4>IPOs</h4></center>
                    </div>
                </div>

                {
                    ipos.length === 0 ?(<div></div>):(
                        <div className="row">
                    {
                        ipos.map((ipo)=>{
                            return(
                                <div className="col-xl-12" style={{marginTop:'1.5rem'}}>
                                <div class="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <h5>IPO - {ipo.company.name}</h5>
                                            
                                        </div>
                                        <div className="col-xl-3" style={{float:'right'}}>
                                            
                                            <Link to={`/manage/ipo/edit/${ipo.id}`} className="btn btn-warning" style={{marginLeft:'1rem',float:'right'}}><i className="fa fa-pencil"  ></i>Edit</Link>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                    
                                    <div class="card-body">
                                        <p class="card-text">Price Per Share - {ipo.pricePerShare}</p>
                                        <p class="card-text">Total number of shares - {ipo.totalNumberOfShares}</p>
                                        <p class="card-text">Date & Time - {getDate(ipo.openDateTime)}{' '}{getTime(ipo.openDateTime)}</p>
                                        
                                        <p className="card-text">Remarks - {ipo.remarks}</p>
                                        <h6 class="badge badge-primary">{ipo.stockExchange.name}</h6>
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
