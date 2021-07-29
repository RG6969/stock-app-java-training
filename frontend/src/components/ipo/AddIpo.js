import React,{useEffect, useState} from 'react'
import Navbar from '../layout/Navbar';
import './ipo.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import DateTimePicker from 'react-datetime-picker';

export default function AddIpo(props) {
    const [ipo,setIpo]=useState({
        pricePerShare:'',
        totalNumberOfShares:'',
        companyId:'',
        stockExchangeId:'',
        remarks:''
    });
    const [value, setValue] = useState(new Date());

    function toISODate (dt) {
        return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString()
    }

    const [companies,setCompnaies]=useState([]);
    const [stockExchanges,setStockExchanges] = useState([])

    const [loading,setLoading]=useState(true);
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`,config);
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config);

                setCompnaies(res.data);
                setStockExchanges(result.data);
                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);

            }
            
        }
        getData();
    },[])

    const onChange = e => setIpo({ ...ipo, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {pricePerShare,stockExchangeId,companyId,remarks,totalNumberOfShares}=ipo;
            if(pricePerShare === ''  || companyId ==='' || stockExchangeId ==='' || remarks ==='' || totalNumberOfShares ==='' ){
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
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/ipo`,{
                pricePerShare,
                stockExchangeId,
                companyId,
                openDateTime: toISODate(value),
                remarks,
                totalNumberOfShares
            },config)
            setLoading(false);
            toast.success('IPO added', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                props.history.push('/manage/ipos');
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


    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>):(
        <div>
            <Navbar/>
            
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Add IPO</h1>
          </div>
          <div class="form-content">
            <form>
            <div class="form-group"><label for="pricePerShare">Company</label>
                <select className="form-control" name="companyId" id="companyId" onChange={onChange} >
                    {
                        companies.map((company)=>{
                            return(
                                <option value={company.id}>{company.name}</option>
                            )
                        })
                    }
                
                </select>
            </div>
            <div class="form-group"><label for="pricePerShare">Stock Exchange</label>
                <select className="form-control" name="stockExchangeId" id="stockExchangeId" onChange={onChange} >
                    {
                        stockExchanges.map((se)=>{
                            return(
                                <option value={se.id}>{se.name}</option>
                            )
                        })
                    }
                
                </select>
            </div>
            
            <label for="openDateTime">Open Date Time</label>
            <br></br>
            <DateTimePicker
            onChange={setValue}
            value={value}
          />
            
            
            <br></br>
              <div class="form-group"><label for="pricePerShare">Price Per Share</label><input onChange={onChange} type="text" id="pricePerShare" name="pricePerShare" required="required" /></div>
              
              <div class="form-group"><label for="totalNumberOfShares">Total Number Of Share</label><input onChange={onChange} type="text" id="totalNumberOfShares" name="totalNumberOfShares" required="required" /></div>
              
              <div class="form-group"><label for="remarks">Remarks</label><textarea rows="5" className="form-control" onChange={onChange} type="text" id="remarks" name="remarks" required="required" /></div>
              
              
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
              
        </div>
    )
}
