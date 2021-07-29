import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './user.css';
import { toast } from 'react-toastify';

export default function StockExchanges() {
    const [loading,setLoading]=useState(true);
    const [stockExchanges,setStockExchanges]=useState([])
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config).then((res)=>{
            console.log(res);
            setStockExchanges(res.data);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    },[])

    

    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>):(
        <div>
            <Navbar/>
            <div className="container" style={{marginTop:'5rem'}}>
                
                <div className="row" style={{marginTop:'2rem'}}>
                    <div className="col">
                    <center><h4>Stock Exchanges</h4></center>
                    </div>
                </div>
                {
                    stockExchanges.length === 0 ?<div></div> :(
                        <div className="row">
                    {
                        stockExchanges.map((stockExchange)=>{
                            return(
                                <div className="col-xl-12" style={{marginTop:'1.5rem'}}>
                                <div class="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <h5>{stockExchange.name}</h5>
                                            
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                    
                                    <div class="card-body">
                                        <h5 class="card-title">{stockExchange.stockExchangeCode}</h5>
                                        <p class="card-text">{stockExchange.brief}</p>
                                        <Link to={`/companies/stockExchange/${stockExchange.id}`} class="btn" style={{backgroundColor:'#5a5af3',color:'white'}}>Companies</Link>
                                    </div>
                                    <div className="card-footer">
                                        {stockExchange.address}
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
