import React from "react";
import "../App.css";

function Coin({Posts,loading,final_loading,value}){
  console.log("In Coin Class");
  console.log(Posts.length);
  console.log("After Coin Class");
  return(
    
    
    
  //We extract the individual data from the array
          
       
      
        <ul>
         { 
         Posts && Posts.length?
         Posts.map(Post => (
            //return <h1>{coin.name}</h1>; //Returning coin name ..You can check in the inspect element.
            //We can also pass to the component and return it from there
            //To use we need to import - See above
           <div className="coin">
            <li>
                <h1>Name: {Post.Title}</h1>
                <h4>Website: <a href={Post.Link}> {Post.Link} </a>  </h4>
                <h6>Description: {Post.Description}</h6>
            </li>
            </div>
           
          )) : loading ? value!= "" ? final_loading ? <h3> No data found </h3> : null : null : null } 
          {
           loading? value =="" ? <h3> Enter some data</h3> : null : null
          }
          </ul> 
      
          

);
}

export default Coin;
