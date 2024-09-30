import { PiArrowCircleRightFill } from "react-icons/pi";
import "./aboutt.css"
export default function Aboutt ()
{
    return(
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <img src='./images/about.png' className='imgg '></img>
                </div>
                <div className='col-md-6 col-12 p-5'>
                    <h2>Why Choose us?</h2>
                    <p className='fs-5 fw-light mt-5 mb-5'>With years of experience and deep industry knowledge, we have a proven track record of success and are constantly pushing ourselves to stay ahead of the curve.</p>
                    <div className='mb-3'>
                    <PiArrowCircleRightFill className='bluee'/>
                    <span className='fs-5'>Our evolution procedure is super intelligent.</span>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}