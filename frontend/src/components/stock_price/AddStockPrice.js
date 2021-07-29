import React,{useEffect, useState} from 'react'
import Navbar from '../layout/Navbar';
import readXlsxFile from 'read-excel-file';
import axios from 'axios';

export default function AddStockPrice() {

    const [stockExchanges,setStockExchanges]=useState([]);
    const [data,setData]=useState([]);
    const [showData,setShowData]=useState(false);
    const [stockExchangeCode,setStockExchangeCode]=useState('NSE')

    function toISODate (dt) {
        return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString()
    }

    const token= localStorage.getItem('admin-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };
       

    useEffect(()=>{
        const getData = async()=>{
            try{
                const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stockexchanges`,config);
                const data=[]
                await Promise.all(result.data.map((se)=>{
                    data.push({
                        stockCode:se.stockExchangeCode,
                        id:se.id
                    })
                }))
                setStockExchanges(data);
            }catch(err){
                console.log(err);
                console.log(err);
            }
        }
        
        getData();
            
         
                
                
    },[])

    const getDate = (date) => {
        const data = new Date(date);
        return data.toDateString();
    }
    const getTime = (date) => {
        const data = new Date(date);
        return data.toTimeString();
    }


    const fileChanged= async(e)=>{
        setShowData(false);
        try{
            const rows = await readXlsxFile(e.target.files[0])
            console.log(stockExchanges)
            console.log(rows);
            rows.shift();
            const data=[];
            var stockId ='161';
            setStockExchangeCode(rows[0][1]);
            await Promise.all(stockExchanges.map((se)=>{
                if(se.stockCode == rows[0][1]){
                    stockId=se.id;
                }
            }))
            await Promise.all(rows.map((row)=>{
                console.log(row)
                if(row[0] !== null && row[1] !== null && row[3]!==null){
                    const stockPriceData={
                        companyCode:row[0],
                        stockExchangeCode:stockId,
                        price:row[2],
                        date:row[3],
                        time:row[4]
                    }
                    data.push(stockPriceData)
                }
            }))
            setData(data);
            const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stockPrices`,data,config)
            console.log(result);
            setShowData(true);
            
        
    }catch(err){
        console.log(err);
    }
}

    
    return (
        <div>
            <Navbar/>
            <div className="container" style={{marginTop:'5rem'}}>
            <label>Upload Stock Price Data</label>
            <br></br>
            <div style={{alignItems:'center',justifyContent:'center',textAlign:'center',border:'3px dotted #8fd9ea',height:'200px',backgroundColor:'#d3e7ff'}}>
                <i class="fa fa-cloud-upload fa-4x" aria-hidden="true" style={{marginTop:'60px'}}></i>
                <br></br>
                <input style={{marginTop:'30px'}} type="file" onChange={(e)=>fileChanged(e)}></input>
            </div>
            
            {
                showData ?(
                    <div style={{marginTop:'3rem'}}>
                    <h6>Summary : {data.length} rows added.</h6>
                    <table class="table table-bordered table-hover" style={{marginTop:'1rem'}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Company Code</th>
      <th scope="col">StockExchange Code</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody>
  {
      data.map((stockPrice,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{stockPrice.companyCode}</td>
                <td>{stockExchangeCode}</td>
                <td>{stockPrice.price}</td>
                <td>{getDate(stockPrice.date)}</td>
                <td>{stockPrice.time}</td>
                
                
            </tr>
        )
      })
  }
    
    
  </tbody>
</table>
</div>
                ):(
                    <div></div>
                )
            }
            
            </div>
        </div>
    )
}
