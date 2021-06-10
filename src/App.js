import React, { useState, Component } from 'react';
import './App.css';

import {  Button,  
          Collapse,
          Navbar,
          NavbarToggler,
          NavbarBrand,
          Nav,
          NavItem,
          NavLink,
          UncontrolledDropdown,
          DropdownToggle,
          DropdownMenu,
          DropdownItem,
          FormGroup,
          Label, Input,
          NavbarText } from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route, HashRouter
} from "react-router-dom";

import Charts from './pages/Charts'
import News from './pages/News'
import Countries from './pages/Countries'


class App extends Component{

  constructor() {
    super()
    this.state = {
      isOpen : false
    } 
  }

  toggle() {
    this.setState({isOpen : !this.state.isOpen})
  }

  render() {
    return (
      <HashRouter>
      
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href={process.env.PUBLIC_URL+'/#/'}>COVID-19 DASHBOARD</NavbarBrand>
            <NavbarToggler onClick={()=> this.toggle()} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>

                <NavItem>
                  <NavLink href={process.env.PUBLIC_URL+'/#/countries'}>Countries</NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink href={process.env.PUBLIC_URL+"/#/news"}>News</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Chart
                  </DropdownToggle>
                  <DropdownMenu right style={{maxHeight : 400, overflowY: 'scroll'}}>
                      <DropdownItem>
                        Global
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Countries
                      </DropdownItem>    
                  </DropdownMenu>
                </UncontrolledDropdown>

              </Nav>
              <NavbarText>Simple Text</NavbarText>
            </Collapse>
        </Navbar>
      

        <Switch>
          <Route exact path="/">
            <Charts/>
          </Route>
          <Route path="/news">
            <News/>
          </Route>
          <Route path="/countries">
            <Countries/>
          </Route>
        </Switch>

      </HashRouter>
    );
}



news() {
  return (
    <h1>foo</h1>
  )
}






}

export default App;
