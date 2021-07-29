import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './user.css';
import { toast } from 'react-toastify';

export default function Sectors() {
    const [loading,setLoading]=useState(true);
    const [sectors,setSectors]=useState([])
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/sectors`,config).then((res)=>{
            console.log(res);
            setSectors(res.data);
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
                    <center><h4>Sectors</h4></center>
                    </div>
                </div>
                <div className="row">
                    {
                        sectors.map((sector)=>{
                            return(
                                <div className="col-xl-12" style={{marginTop:'1.5rem'}}>
                                <div class="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-xl-9">
                                            <h5>{sector.name}</h5>
                                            
                                        </div>
                                        <div className="col-xl-3">
                                        <Link to={`/companies/sector/${sector.id}`} class="btn" style={{backgroundColor:'#5a5af3',color:'white',float:'right'}}>Companies</Link>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                    
                                    <div class="card-body">
                                        
                                        <p class="card-text">{sector.brief}</p>
                                        
                                    </div>
                                    
                                    </div>
                                    </div>
                            )
                        })
                    }
                
                </div>
            
            </div>
        </div>
    )

}
