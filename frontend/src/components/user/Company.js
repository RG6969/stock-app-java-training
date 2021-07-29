import React,{useState,useEffect} from 'react';
import Navbar from '../layout/Navbar';
import './user.css';
import { toast } from 'react-toastify';
import axios from 'axios';

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Company(props) {

    const [company,setCompany]=useState({
        name:'',
        boardOfDirectors:'',
        description:'',
        turnover:'',
        id:'',
        stockCode:'',
        ceo:''
    })

    const [stockExchanges,setStockExchanges]=useState([]);

    const [prices,setPrices]=useState();
    const [minPrice,setMinPrice]=useState();
    const [maxPrice,setMaxPrice]=useState();
    const id = props.match.params.id;

    const [loading,setLoading]=useState(true);
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const [priceData,setPriceData]=useState([]);
    const dataSource = {
        chart: {
          caption: company.name,
          subCaption: 'Stock Price Data',
          xAxisName: 'Date & Time',
          yAxisName: 'Price in Rupees',
          theme: 'fusion'
        },
        data: priceData
      };
       
      const chartConfigs = {
        type: 'column2d',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

      const chartConfigsLine = {
        type: 'line',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

      const chartConfigsBar = {
        type: 'bar2d',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

    useEffect(()=>{

        const getData = async()=>{
            try{
                const res= await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${id}`,config);
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config);
                setStockExchanges(result.data);
                setCompany(res.data);
                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
            
        }

        getData();
        
            
        
    },[])

    const onChange = e => setCompany({ ...company, [e.target.name]: e.target.value });

    const [startDate,setStartDate]=useState(new Date());
    const [endDate,setEndDate]=useState(new Date());

    const fetchPrice = async()=>{
        console.log(startDate)
        console.log(endDate)
        setLoading(true);
        const res = await await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stockPrices/company/list`,{
            companyCode:id,
            startDate,
            endDate
        },config);
        setPrices(res.data);
        const chartData=[]
        var min = 1000000;
        var max=0;
        await Promise.all(res.data.map((item)=>{
            const chartItem = {
                label:item.date +" "+item.time,
                value:item.price
            }
            if(item.price < min){
                min=item.price
            }

            if(item.price > max){
                max = item.price
            }
            chartData.push(chartItem);
            if(chartData.length === res.data.length){
                dataSource.data = chartData
                setPriceData(chartData)
                setMaxPrice(max);
                setMinPrice(min);
            }
        }))
        

        setLoading(false);
        console.log(res);
    }

    


    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            <Navbar/>
            
            <section id="form-page">
        
        
        
        <div className="container form-page" style={{marginTop:'5rem'}} >
        
        <div className="row" style={{margin:10}}>
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
                            
        
        
      </div>
        
    <div style={{marginTop:'2rem'}}>
    
        <div className="row" style={{margin:10}}>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <label>Start Date</label>
            <input type="date" className="form-control" name="startDate" onChange={(e)=>setStartDate(e.target.value)}/>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <label>End Date</label>
            <input type="date" className="form-control" name="endDate" onChange={(e)=>setEndDate(e.target.value)}/>
        </div>
       
        </div>
        
       

    </div>

    <div className="row" style={{margin:10}}>
        <div className="col">
            <button className="btn btn-block btn-success" onClick={fetchPrice}>Submit</button>
        </div>
    </div>

    <br></br>
    <br></br>
    

    <div className="row" style={{margin:10}}>
        <div className="col">
            <h4>{company.name}</h4>
            Min Price - {minPrice}
            <hr></hr>
            Max Price - {maxPrice}
        </div>
    </div>

    
    <div className="row" style={{margin:10}}>
        <div className="col">
            <ReactFC {...chartConfigsLine}/>
        </div>
    </div>
    <div className="row" style={{margin:10}}>
        <div className="col">
            <ReactFC {...chartConfigsBar}/>
        </div>
    </div>
    <div className="row" style={{margin:10}}>
        <div className="col">
            <ReactFC {...chartConfigs}/>
        </div>
    </div>
        
        </div>
        
        </section>  
        
             
        </div>
    )
}
