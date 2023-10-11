import React from 'react';

function NavBar() {
    return (
        <nav>
            <ul style={{ display: 'flex', listStyle: 'none' }}>
                <li style={{padding:'20px'}}><a href="#">Home</a></li>
                <li style={{padding:'20px'}}><a href="#">About</a></li>
                <li style={{padding:'20px'}}><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;
