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

export default function CompareCompanies(props) {

    const [companies,setCompanies]=useState([])

    const [company1,setCompany1]=useState({
        name:'None',
        boardOfDirectors:'',
        description:'',
        turnover:'',
        id:'',
        stockCode:'',
        ceo:''
    })
        

    const [company2,setCompany2]=useState({
        name:'None',
        boardOfDirectors:'',
        description:'',
        turnover:'',
        id:'',
        stockCode:'',
        ceo:''
    })

    const [stockExchanges,setStockExchanges]=useState([]);

    const [prices,setPrices]=useState();
    const [minPrice1,setMinPrice1]=useState();
    const [maxPrice1,setMaxPrice1]=useState();
    const [minPrice2,setMinPrice2]=useState();
    const [maxPrice2,setMaxPrice2]=useState();
    const id = props.match.params.id;

    const [loading,setLoading]=useState(true);
    const token= localStorage.getItem('user-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    const [priceData1,setPriceData1]=useState([]);
    const [priceData2,setPriceData2]=useState([]);

    const [categories,setCategories]=useState()


    const dataSource = {
        "chart": {
            "caption": "Comparison",
            "subCaption": company1.name ? company1.name : " " + " vs" + company2.name ? company2.name : " ",
            "xAxisName": "Day",
            "theme": "fusion"
        },
        "categories": [
            {
                "category": categories
            }
        ],
        "dataset": [
            {
                "seriesname": company1.name ? company1.name : " ",
                "data": priceData1
            },
            {
                "seriesname": company2.name ? company2.name : " ",
                "data": priceData2
            }
        ],
        "trendlines": [
            {
                "line": [
                    {
                        "startvalue": "0",
                        "color": "#6baa01",
                    }
                ]
            }
        ]
    }

    // const dataSource = {
    //     chart: {
    //       caption: 'company.name',
    //       subCaption: 'Stock Price Data',
    //       xAxisName: 'Date & Time',
    //       yAxisName: 'Price in Rupees',
    //       theme: 'fusion'
    //     },
    //     data: priceData
    //   };
       
      const chartConfigs = {
        type: 'mscolumn2d',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

      const chartConfigsLine = {
        type: 'msline',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

      const chartConfigsBar = {
        type: 'msbar2d',
        width: '100%',
        height: 600,
        dataFormat: 'json',
        dataSource: dataSource
      };

    useEffect(()=>{

        const getData = async()=>{
            try{
                const res= await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`,config);
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config);
                setStockExchanges(result.data);
                setCompanies(res.data);
                setLoading(false);
            }catch(err){
                console.log(err);
                setLoading(false);
            }
            
        }

        getData();
        
            
        
    },[])

    //const onChange = e => setCompany({ ...company, [e.target.name]: e.target.value });

    const [startDate,setStartDate]=useState(new Date());
    const [endDate,setEndDate]=useState(new Date());

    const fetchPrice = async()=>{
        
        setLoading(true);
        try{
            const data1 = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${company1Id}`,config);
        const data2 = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${company2Id}`,config);
        setCompany1(data1.data);
        setCompany2(data2.data);
        const res1 = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stockPrices/company/list`,{
            companyCode:company1Id,
            startDate,
            endDate
        },config);
        const res2 = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stockPrices/company/list`,{
            companyCode:company2Id,
            startDate,
            endDate
        },config);

        const chartData1=[]
        const chartDataCategories=[];
        var min = 1000000;
        var max=0;
        await Promise.all(res1.data.map((item)=>{

            chartDataCategories.push({
                label:item.date + " "+item.time
            })
        
            if(item.price < min){
                min=item.price
            }

            if(item.price > max){
                max = item.price
            }
            chartData1.push({
                value:item.price
            });
            if(chartData1.length === res1.data.length){
                setPriceData1(chartData1)
                setMaxPrice1(max);
                setMinPrice1(min);
                setCategories(chartDataCategories)
            }
        }))

        const chartData2=[]
        min=1000000;
        max=0;
        await Promise.all(res2.data.map((item)=>{

        
            if(item.price < min){
                min=item.price
            }

            if(item.price > max){
                max = item.price
            }
            chartData2.push({
                value:item.price
            });
            if(chartData2.length === res2.data.length){
                setPriceData2(chartData2)
                setMaxPrice2(max);
                setMinPrice2(min);
            }
        }))
        

        setLoading(false);
        }catch(err){
            console.log(err);
        }

        
        
    }

    const [company1Id,setCompany1Id]=useState();
    const [company2Id,setCompany2Id]=useState();

    


    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>): (
        <div>
            <Navbar/>
            
            <section id="form-page">
        
        
        
        <div className="container form-page" style={{marginTop:'5rem'}} >
        
        
        
        
      
        
    <div style={{marginTop:'2rem'}}>

        <div className="row" style={{margin:10}}>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <select className="form-control" onChange={(e)=>setCompany1Id(e.target.value)}>
                {
                    companies.map((company)=>{
                        return(
                            <option value={company.id}>{company.name}</option>
                        )
                    })
                }
            </select>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <select className="form-control" onChange={(e)=>setCompany2Id(e.target.value)}>
                {
                    companies.map((company)=>{
                        return(
                            <option value={company.id}>{company.name}</option>
                        )
                    })
                }
            </select>
        </div>
        </div>
    
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
        
       


    <div className="row" style={{margin:10}}>
        <div className="col">
            <button className="btn btn-block btn-success" onClick={fetchPrice}>Submit</button>
        </div>
    </div>

    <br></br>
    <br></br>
    

    <div className="row" style={{margin:10}}>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <h4>{company1.name ? company1.name:" "}</h4>
            Min Price - {minPrice1}
            <hr></hr>
            Max Price - {maxPrice1}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <h4>{company2.name ? company2.name:" "}</h4>
            Min Price - {minPrice2}
            <hr></hr>
            Max Price - {maxPrice2}
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
        </div>
        </section>  
        
             
        </div>
    )
}
