import "./Footer.css";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {Link} from "react-router-dom";

const email = "manthan.nimon28@gmail.com";

const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

export default function Footer() {
   return (
      <>
         <div className="footer">
            <div className="footer-content container container-fluid"><h4>Todo</h4> <p>&copy;&nbsp;Manthan</p></div>
            <div className="contact">
            <Link className="linkedin" to="https://www.linkedin.com/in/manthan-nimonkar-082987297/" target="_blank" rel="noopener noreferrer">
               <FaLinkedin />
            </Link>
            <FaFacebook />
            <a className="mail" href={gmailLink} target="_blank" rel="noopener noreferrer">
               <MdEmail />
            </a>
            </div>
         </div>
      </>
   )
}

