import React,{ useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css'













const Navbar = (props) => {

    

    

    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [admin,setAdmin]=useState(false);

    const token=localStorage.getItem('user-auth-token');

    useEffect(() => {
        if(token){
            setIsAuthenticated(true);
            return;
        }
        if(localStorage.getItem('admin-auth-token')){
            setAdmin(true);
            return;
        }
        setIsAuthenticated(false);
        
    }, )

    

    const openRoutes = (
        <nav className="navbar navbar-expand-lg fixed-top text-light portfolio-navbar">
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Stock App</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"><i class="fa fa-bars" style={{color:'#fff'}}></i></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/">Home</a></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/admin/login">Admin</Link></li>
                    
                
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/login">Login</Link></li>
                    <li className="nav-item" role="presentation"><Link to="/signup" class="get-started-btn scrollto">Get Started</Link></li>
                    
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    )


    
    

    

   

    

      

    const adminRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top text-light portfolio-navbar">
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Stock App</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"><i class="fa fa-bars" style={{color:'#fff'}}></i></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/">Home</a></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/manage/stockexchanges">Stock Exchanges</Link></li>
                    
                    
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/manage/companies">Companies</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/manage/sectors">Sectors</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/manage/ipos">IPO</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/manage/stock-prices">Stock Prices</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/admin/account">Account</Link></li>
                    
                    
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    );

    var userRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Stock App</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/">Home</a></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/stockexchanges">Stock Exchanges</Link></li>
                    
                    
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/companies">Companies</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/sectors">Sectors</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/ipos">IPO</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/account">Account</Link></li>
                    
                    
                    
                    
                    

                    
                    
                    
                </ul>
                
            </div>
           
        </div>
    </nav>
    )
    return isAuthenticated?userRoutes: admin ? adminRoutes:openRoutes;
}

export default Navbar;