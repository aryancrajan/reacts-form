import React from "react";
import './ticket.css'

function Ticket(props){
    const {flightName,location,time}= props
    return (
        <div className="ticket">
            
            <p>Flight Name: {flightName} <br />
                Location: {location} <br />
                Time: {time} <br />
            </p>
        </div>
    )
}



export default Ticket