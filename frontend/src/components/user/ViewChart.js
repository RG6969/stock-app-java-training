import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';

export default function ViewChart() {

    const [loading,setLoading]=useState(true);
    const [stockExchanges,setStockExchanges]=useState([]);
    const [companies,setCompanies]=useState([])
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config).then((res)=>{
            console.log(res);
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`,config).then((result)=>{
                console.log(res);
                setStockExchanges(res.data);
                setCompanies(result.data);
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
                console.log(err);
            })
            
            
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    },[])
    

    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            <Navbar/>
            <div className="container" style={{marginTop:'4rem'}}>
                <div className="form-control">
                <label>Company</label>
                    <select className="form-control">
                        {
                            companies.map((company)=>{
                                return(
                                    <option value={company.id}>{company.name}</option>
                                )
                            })
                        }
                    </select>
                    <hr/>
                    <label>Stock Exchange</label>
                    <select className="form-control">
                        {
                            stockExchanges.map((se)=>{
                                return(
                                    <option value={se.id}>{se.name}</option>
                                )
                            })
                        }
                    </select>
                    <hr/>
                    <input type="date"></input>
                    <hr/>
                    <input type="date"></input>
                
                
                </div>
            
            </div>
        </div>
    )
}
