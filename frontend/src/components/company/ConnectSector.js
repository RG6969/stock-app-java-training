import React,{useState,useEffect} from 'react';
import Navbar from '../layout/Navbar';
import './company.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

import MultiSelect from "react-multi-select-component";

export default function ConnectSector(props) {

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
    const [selected, setSelected] = useState("");

    const [loading,setLoading]=useState(true);
    const [sectors,setSectors]=useState([]);
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
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/sectors`,config)
                setCompany(res.data);
                setSectors(result.data);
                const opt=[];
                await Promise.all(result.data.map((sector)=>{
                    const data={
                        label:sector.name,
                        value:sector.id
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
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/company/addSector`,{
                companyCode:id,
                sectorCode:selected
            },config)
            toast.success(`sector for ${company.name} added`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                <h6>Choose Sector</h6>
                
                <select class="form-control" onChange={(e)=>setSelected(e.target.value)}>
                    {
                        options.map((option)=>{
                            return(
                                <option value={option.value}>{option.label}</option>
                            )
                        })
                    }
                </select>

                <button className="btn btn-block" onClick={submit} style={{backgroundColor:'#5a5af3',marginTop:'1.5rem'}}>Submit</button>
                
            </div>
        </div>
    )
}
