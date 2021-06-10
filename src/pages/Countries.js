import React, { useState, Component } from 'react'

import {
    Card, CardImg, CardText, CardGroup, CardBody, CardLink,
    CardTitle, CardSubtitle, Container, Row, Col, FormGroup,
    Label, Input, Alert, Table
  } from 'reactstrap'





class Countries extends Component{

  constructor(props) {
    super(props)
    this.state = {
        countries : [],
        displayCountries : []
        
    }
    fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(data => {
        this.setState({countries : data.Countries, displayCountries : data.Countries})
    })
  }   

  onKeyUp(value) {
    //console.log(value)
    //this.setState({text : text})
    var filteredCountries

    if (value.length==0)
      filteredCountries = this.state.countries
    else
      filteredCountries =  this.state.countries.filter((country) => {
        return country.Country.toLowerCase().includes(value.toLowerCase())
      })

    this.setState({displayCountries : filteredCountries})
  }

    render() {
        return (
    
            <Container center className="mt-3">
                <FormGroup>
                    <Input type="text" placeholder="Filter by country name" onChange={(e)=>this.onKeyUp(e.target.value)}/>
                </FormGroup>

                <Table responsive striped hover className='mt-3' >
                    <thead style={{backgroundColor: '#b9b9c4', position: "sticky", top:0 }}>
                        <tr>
                            <th></th>
                            <th>Country name</th>
                            <th>Country code</th>
                            <th>Total confirmed</th>
                            <th>Total death</th>
                            <th>Total recovered</th>
                            <th>Last updated</th>
                        </tr>
                    </thead>
                    <tbody>

                        

                        {this.state.displayCountries.map((value, index) => {
                                    return <tr>
                                                <td scope="row">{index+1}</td>
                                                <td>{value.Country}</td>
                                                <td>{value.CountryCode}</td>
                                                <td>
                                                    <p style={{color : "#b38f00", fontWeight: 'bold'}}>{value.TotalConfirmed}</p> 
                                                    (+{value.NewConfirmed})
                                                </td>
                                                <td>
                                                    <p style={{color : "red", fontWeight: 'bold'}}>{value.TotalDeaths}</p> 
                                                    (+{value.NewDeaths})
                                                </td>
                                                <td>
                                                    <p style={{color : "green", fontWeight: 'bold'}}>{value.TotalRecovered}</p> 
                                                    (+{value.NewRecovered})
                                                </td>
                                                
                                                <td>{new Date(value.Date).toLocaleString()}</td>
                                            </tr>
                        })}
                        
                    </tbody>
                    </Table>
               
    
            </Container>
            
        )
            
      }



}
export default Countries;

