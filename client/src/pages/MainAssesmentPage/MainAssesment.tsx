import React from 'react'
import Table from '../../components/Table/Table'
import './MainAssesment.scss'
import {Link} from "react-router-dom"
const MainAssesment:React.FC = () => {
  return (
   <div className="main-assesment-wrapper">
   <div className="left-side">
<div className="logout">
  logout
</div>
   </div>
   <div className="right-side">
    <div className="right-container">
    <p>Assesment</p>
<Link to="/create"  style={{ marginLeft: 'auto' }}>
<button>
        create
    </button>
</Link>
  
    <div className="table">

             <Table/> 
         

    </div>
    </div>
   </div>
   </div>
  )
}

export default MainAssesment