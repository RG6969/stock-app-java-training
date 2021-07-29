import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './user.css';
import { toast } from 'react-toastify';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function Companies(props) {
    const [loading,setLoading]=useState(true);
    const [companies,setCompanies]=useState([])
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const [items,setItems]=useState([])
    
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        props.history.push(`/company/${item.id}`)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return item;
       // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
      }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`,config).then(async(res)=>{
            console.log(res);
            setCompanies(res.data);

            const searchItems=[]
            await Promise.all(res.data.map(company=>{
                const temp={
                    id:company.id,
                    name:company.name
                }
                searchItems.push(temp);

                if(searchItems.length === res.data.length){
                    setItems(searchItems)
                }
            }))
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

                <Link className="btn btn-success" to="/compare/companies"><i className="fa fa-building-o"></i>{' '}Compare Companies</Link>

                <br></br>
                <div className="row" style={{marginTop:'2rem'}}>
                    <div className="col">
                    <center><h4>Companies</h4></center>
                    </div>
                </div>
                <div style={{ width: '100%',marginTop:'1rem' }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
               
                
                <div className="row" style={{marginTop:'3rem'}}>
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
                                        <h5 class="badge badge-dark">Sector - {company.sector ? company.sector.name : " "}</h5>
                                        
                                    </div>
                                    <div className="card-footer">
                                        CEO - {company.ceo}
                                        <Link to={`/company/${company.id}`} style={{float:'right'}} className="btn btn-success">View Data</Link>
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
