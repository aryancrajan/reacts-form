import React from "react";


function Ticket(props){
    const {destination,t}= props
    return (
        <div>
            <h1>Available Tickets for {destination}</h1>
            <ul>
               {/* {t && t.map((str)=>{
                    return(<li>{str}</li>)
               })
            } */}
            <li>2pm</li>
            <li>6pm</li>
            <li>10pm</li>


            </ul>
        </div>
    )
}



export default Ticket