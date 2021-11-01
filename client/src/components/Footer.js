import React from 'react'
import '../stylesheet/footer.css'
function Footer () {
  return (
    <div className='footer'>
      <div className='container_footer'>
        <div className='container_logo_footer'>
          <div className='runners_High_footer'>Runner's High</div>
        </div>
        <div className='navbar_link_footer_ourservice'>
          <div className='footer_title'>Our service</div>
          <a href='' target='_blank'>Wiki</a>
          <a href='' target='_blank'>Github</a>
        </div>
        <div className='navbar_link_footer_adress'>
          <div className='footer_title'>Github Adress</div>
          <span>

            <a href='' target='_blank'>김형재</a>
            <a href='' target='_blank'>김왕선</a>
          </span>
          <span>

            <a href='' target='_blank'>한성린</a>
            <a href='' target='_blank'>이규황</a>
          </span>
        </div>

      </div>
      <div className='copyright'> © Copyright 2021 Runner’s High Inc. All rights reserved. </div>
    </div>
  )
}

export default Footer
