import React,{useState,useEffect} from 'react';
import Navbar from '../layout/Navbar';
import './ipo.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

export default function EditIpo(props) {
    const [ipo,setIpo]=useState({
        pricePerShare:'',
        totalNumberOfShares:'',
        remarks:''
    });

    
    const id = props.match.params.id;

    const [loading,setLoading]=useState(true);
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ipo/${id}`,config).then((res)=>{
            setIpo(res.data);

            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    },[])

    const onChange = e => setIpo({ ...ipo, [e.target.name]: e.target.value });

    const submit = async (e)=>{
        e.preventDefault();
        try{
            const {pricePerShare,totalNumberOfShares,remarks}=ipo;
            if(pricePerShare === '' || totalNumberOfShares === '' || remarks ===''){
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
            const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/ipo/${id}`,{
                pricePerShare,
                remarks,
                totalNumberOfShares
            },config)
            setLoading(false);
            toast.success('IPO updated', {
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

</div>): (
        <div>
            <Navbar/>
            
            <section id="form-page">
        
        
        
        <div className="container form-page" >
        
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Edit Stock Exchange</h1>
          </div>
          <div class="form-content">
            <form>
              
            <div class="form-group"><label for="pricePerShare">Price Per Share</label><input onChange={onChange} type="text" id="pricePerShare" name="pricePerShare" required="required" value={ipo.pricePerShare} /></div>
              
            <div class="form-group"><label for="totalNumberOfShares">Total Number Of Share</label><input onChange={onChange} type="text" id="totalNumberOfShares" name="totalNumberOfShares" required="required" value={ipo.totalNumberOfShares} /></div>
              
              <div class="form-group"><label for="remarks">Remarks</label><textarea rows="5" className="form-control" onChange={onChange} type="text" id="remarks" name="remarks" value={ipo.remarks} required="required" /></div>
              
              
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
