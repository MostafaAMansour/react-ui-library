'use client';
import React, { useState } from "react";
import data from '@/data/data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Brands.module.css"
function Brands() {
    const [items , setItems] = useState("")
    const [head,setHead]= useState("")
    function hidden()
    {
        setItems("");
        setHead("")
    }
   function display(element)
   {
    if(element)
    {
        setHead(<h2  id={styles.top}>Our {element.Type} Models:</h2>)        
        setItems(
            
            element.cars.map((ele, carIndex) => (
                <div className="col-12 mb-3 mt-4" key={`${carIndex}`}>
                    <div className="card row  ">
                        <div  className="row d-flex" id={styles.content}>
                            <img className="col-5 mt-3" id={styles.photo} src={ele.Photo} alt=" "/>
                            <div className="col-7 mt-5 " id={styles.body}>
                                <h5 className="card-title mt-2">{ele.desc}</h5>
                                <p className="card-text" id={styles.price}>{ele.Price}</p>
                                <button className="btn btn-danger button"  onClick={() => alert('Buying now!')} id={styles.btn}>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )
    }
   }
    return (
        <div className="container mb-4">
            
            <div className="card">
                <form className="card-body " style={{textAlign:"center"}} onSubmit={(event)=>{
                    event.preventDefault()
                }} >
                    <h2  className={styles.redd}>Our Car Models</h2>
                    
                    <div>
                    <ul className="row">
                        {data.map((item, index) => (
                        <div className="col-lg-3 col-md-4 col-6" onClick={display.bind(null, item)} onDoubleClick={hidden}  id={styles.model} key={index}>
                            <img  src={item.imageUrl} alt={item.Type} style={{ width: '200px', height: '100px' }} />
                            <h5  className={styles.name} >{item.Type} </h5> <br></br>
                        </div>
                        ))}
                    </ul>
                    </div>
                </form>
            </div>
            <div>
                {head}
                {items}
            </div>
        </div>
    );
}

export default Brands;
