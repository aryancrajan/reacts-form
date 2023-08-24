import React from "react";
import './ticket.css';
import App from "./App";

function Ticket(props){
    const {Name,flightName,location,time,id}= props
    const handleButtonClick = () => {
                    alert(`Hi ${Name}, Your Ticket has been confirmed with Flight Name:${flightName} location:${location} time:${time}`) 
      };
    return (
        <button onClick={handleButtonClick}>
        <div className="ticket">
        
            
            <p>Flight Name: {flightName} <br />
                Location: {location} <br />
                Time: {time} <br />
                id: {id} <br />
            </p>
        </div>
        </button>
    )
}



export default Ticket