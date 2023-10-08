import React from 'react';
import "./Culturals.scss";

const Culturals = () => {
  return (
    <div className="culturals">
        <h2 style={{textAlign:"center"}}>Cultural Destinations that never missed</h2>
      <div className="container">
        <div>


        <div className='img'>
              <img src="https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY" alt="" />
        </div>
        <div className='text'>
            <h3>Culturals</h3>
        </div>
        </div>


      </div>

      <div className='subscribe'>
        <input type="text" placeholder='Enter your email' />
        <button className='subBtn'>Subscribe now</button>

      </div>

    </div>
  )
}

export default Culturals
