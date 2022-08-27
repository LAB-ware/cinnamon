import { Component } from 'react';
import { Navbar, Nav, NavItem} from 'reactstrap';
import Button from 'react-bootstrap/Button';


class Header extends Component {
  render () {
    return(
      <div>
        <Navbar dark expand="md"> 
          <Nav navbar>
              Welcome to Cinnamon~!
              <div className="nav-buttons">
                  <Button variant="primary" className="nav-home">Home</Button>

                  <Button variant="primary" className="nav-sound-check">Sound Check</Button>

                  <Button variant="primary" className="nav-about">About</Button>
              </div>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
