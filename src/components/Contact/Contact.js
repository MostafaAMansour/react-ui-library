import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./contact.css"
export default function Contact()
{
    return(
        <div className="container margin">
            <h1 className="heading m-5">CONTACT US</h1>
            <div className="row">
                <div className="col-lg-3 col-md-6 col-12  ">
                    <div className="card">
                        <FaFacebookSquare className="card-img-top img blue" />
                        <div className="card body m-2 p-2 heading blue fs-2">
                            @Facebook
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12  ">
                    <div className="card">
                        <FaInstagram className="card-img-top img purple" />
                        <div className="card body m-2 p-2 heading purple fs-2">
                            @Instagram
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12  ">
                    <div className="card">
                        <FaYoutube  className="card-img-top img red" />
                        <div className="card body m-2 p-2 heading blue fs-2 red">
                            @Youtube
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12  ">
                    <div className="card">
                        <FaSquareXTwitter className="card-img-top img" />
                        <div className="card body m-2 p-2 heading  fs-2">
                            @X TWitter
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}