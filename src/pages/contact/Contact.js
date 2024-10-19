import React from "react";
import "./contact.scss";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
const Contact = () => {
  return (
    <>
      <div className="contact-parent parent">
        <div className="contact-cont cont">
          <div className="contact-details">
            <div className="call-to-us">
              <p className="call">
                <span>
                  <IoCallOutline />
                </span>
                Call to us
              </p>
              <p className="adddetails">We are Available 24/7 , 7 days a week</p>
              <p className="adddetails">Phone : +91 7028997574</p>
            </div>

            <div className="write-to-us">
              <p className="write">
                <span>
                  <CiMail />
                </span>
                Write To Us
              </p>
              <p className="adddetails">Fill out our form and we will contact you within 24 hours.</p>
              <a href=""  className="adddetails" >Emails: customer@exclusive.com</a>
              <a href=""  className="adddetails" >Emails: customer@exclusive.com</a>
            </div>
          </div>
          <div className="contact-form">
            <form action="">
              <div className="names">
                <input type="text" placeholder="Your Name*"/>
                <input type="text" placeholder="Your email*" />
                <input type="text" placeholder="Your phone*"/>
              </div>
            <textarea name="" id="" placeholder="Your message*" />

          
          <button className="btn">
            Send message
          </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
