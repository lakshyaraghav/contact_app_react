import React from "react";
import { Link,useParams,useLocation } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = () => {
  // const {name,email}=props.location.state.contact;
  const location=useLocation();
  // React.useEffect(()=>{
  //   console.log("location from contactcard",location)
  // },[])
  // console.log(location.state.contact);
  const {name,email}=location.state.contact;
  return (
    <div className="main">
        <div className="ui card centered">
            <div className="image">
                <img src={user} alt="user" />
            </div>
            <div className="content">
                <div className="header">{name}</div>
                <div className="decription">{email}</div>
            </div>
        </div>
        <div className="ui center aligned container">
          <Link to={"/"}><button className="ui button blue center">Back to Contact List</button></Link>
        </div>
    </div>
  );
};

export default ContactDetail;
