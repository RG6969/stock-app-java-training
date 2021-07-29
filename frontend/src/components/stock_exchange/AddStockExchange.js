import React,{useState} from 'react'
import Navbar from '../layout/Navbar';
import './stockexchange.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function AddStockExchange(props) {

    const [stockExchange,setStockExchange]=useState({
        name:'',
        stockExchangeCode:'',
        address:'',
        brief:'',
        remarks:''
    });
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const [loading,setLoading]=useState(false);

    const onChange = e => setStockExchange({ ...stockExchange, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {name,stockExchangeCode,address,brief,remarks}=stockExchange;
            if(name === '' || stockExchangeCode === '' || address==='' || brief ==='' || remarks ===''){
                toast.error('Please fill in all the details', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
              setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stockExchange`,{
                name,
                address,
                remarks,
                stockExchangeCode,
                brief
            },config)
            setLoading(false);
            toast.success('Stock Exchange added', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                props.history.push('/manage/stockexchanges');
        }catch(err){
            setLoading(false);
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


    return (
        <div>
            <Navbar/>
            <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Add Stock Exchange</h1>
          </div>
          <div class="form-content">
            <form>
              <div class="form-group"><label for="name">Name</label><input onChange={onChange} type="text" id="name" name="name" required="required" /></div>
              
              <div class="form-group"><label for="stockExchangeCode">Stock Exchange Code</label><input onChange={onChange} type="text" id="stockExchangeCode" name="stockExchangeCode" required="required" /></div>
              <div class="form-group"><label for="address">Address</label><textarea rows="5" className="form-control" onChange={onChange} type="text" id="address" name="address" required="required" /></div>
              <div class="form-group"><label for="remarks">Remarks</label><textarea rows="5" className="form-control" onChange={onChange} type="text" id="remarks" name="remarks" required="required" /></div>
              <div class="form-group"><label for="brief">Brief</label><textarea className="form-control" rows="8" onChange={onChange} type="text" id="brief" name="brief" required="required" /></div>
              
              <div class="form-group"><button onClick={submit}>Submit</button></div>
              
            </form>
          </div>
        </div>
        <div class="form-panel two">
          
        </div>
        </div>
        
      </div>
        
       
        
        </div>
        </section>  
        </LoadingOverlay>      
        </div>
    )
}
