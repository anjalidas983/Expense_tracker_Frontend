import React from 'react'


function NavBar() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container d-flex justify-content-between align-items-center"> 
          <a className="navbar-brand" href="/" style={{fontWeight:'bolder',fontSize:'25px',fontFamily:'monospace',marginLeft:'90px'}}>EXPENSE TRACKER</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/signup" style={{fontWeight:'bold',fontSize:'20px',color:'black',marginRight:'8px'}}>Sign up</a>
            </li>
          </ul>
        </div>
      </nav>

        
    </div>
  )
}

export default NavBar