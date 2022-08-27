import { Component } from 'react';
import { Navbar, Nav} from 'reactstrap';

class Header extends Component {
  render () {
    return(
      <div>
        <Navbar dark expand="md"> 
          <Nav navbar>
              Welcome to Cinnamon~!
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
