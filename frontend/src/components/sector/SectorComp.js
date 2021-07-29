import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './sector.css';
import { toast } from 'react-toastify';

export default function SectorComp(props) {
    const [loading,setLoading]=useState(true);
    const [companies,setCompanies]=useState([]);
    const id = props.match.params.id;

    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies/sector/${id}`,config).then((res)=>{
            console.log(res);
            setCompanies(res.data);
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
                    <center><h4>Companies</h4></center>
                    <center><h5>Sector - {companies[0].sector.name}</h5></center>
                    </div>
                </div>
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
                                        
                                        
                                    </div>
                                </div>
                                    
                                    <div class="card-body">
                                        <h5 class="card-title">{}</h5>
                                        <p class="card-text">{company.description}</p>
                                        <hr></hr>
                                        <p class="card-text">Turnover - {company.turnover}</p>
                                        <h5 class="badge badge-dark">Sector - {company.sector.name}</h5>
                                        
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
