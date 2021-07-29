import React,{useState,useEffect} from 'react';
import Navbar from '../layout/Navbar';
import './company.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

import MultiSelect from "react-multi-select-component";

export default function LinkStockExchange(props) {
    
    const id = props.match.params.id;
    const [options,setOptions] = useState([]); 
    const [company,setCompany]=useState({
        name:'',
        boardOfDirectors:'',
        description:'',
        turnover:'',
        stockCode:'',
        ceo:''
    })
    const [selected, setSelected] = useState([]);

    const [loading,setLoading]=useState(true);
    const [stockExchanges,setStockExchanges]=useState([]);
    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        
        const getData = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${id}`,config);
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config)
                setCompany(res.data);
                setStockExchanges(result.data);
                const opt=[];
                await Promise.all(result.data.map((se)=>{
                    const data={
                        label:se.name,
                        value:se.id
                    }
                    opt.push(data);

                    if(result.data.length === opt.length){
                        setOptions(opt);
                    }
                }))
                
                setLoading(false)
            }catch(err){
                console.log(err);
                setLoading(false);
            }
            
        }

        getData();
        
    },[])

    const submit = async ()=>{
        try{
            if(selected === null){
                toast.error('Please select a sector', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    return;
            }
            setLoading(true);
            await Promise.all(selected.map(async(se)=>{
                const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/connectCompanyAndStockExchange`,{
                    companyCode:id,
                    stockExchangeCode:se.value
                },config)
                toast.success(`Stock Exchange for ${company.name} added`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }))
            
            
            setLoading(false);
            props.history.push('/manage/companies')

        }catch(err){
            console.log(err);
            setLoading(false);
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
    return loading? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            <Navbar/>
            <div className="container" style={{marginTop:'5rem'}}>
                <div className="row">
                    <h5>{company.name}</h5>
                </div>
                <hr></hr>
                <h6>Choose StockExchanges</h6>
                
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />

                <button className="btn btn-block" onClick={submit} style={{backgroundColor:'#5a5af3',marginTop:'1.5rem'}}>Submit</button>
                
            </div>
        </div>
    )
}
