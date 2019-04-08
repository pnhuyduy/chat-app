import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap'

class NavBar extends React.Component {
  state = {
    isOpen: false
  }

  logout = event => {
    event.preventDefault()
    localStorage.removeItem('userToken')
    this.props.history.push('/')
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    const guestLink = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </NavItem>
      </Nav>
    )

    const userLink = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/logout" onClick={ this.logout } className="nav-link">
            Logout
          </Link>
        </NavItem>
      </Nav>
    )

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to="/" className="navbar-brand">Simple Chat App</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {localStorage.userToken ? userLink : guestLink}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(NavBar)
