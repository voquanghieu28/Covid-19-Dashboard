import React, { useState, Component } from 'react';


import {  Button,  
          Collapse,
          Navbar,
          NavbarToggler,
          NavbarBrand,
          Nav,
          NavItem,
          NavLink,
          UncontrolledDropdown,
          FormGroup,
          Label, Input,
          NavbarText,
          Card,
          Row, Col, Container,
          Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Chart from 'chart.js';


class Charts extends Component{
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);

  constructor(props) {
    super(props);
    this.state = {
      isOpen : false,
      countries : [],
      lineChart : null,
      pieChart : null,
      isOpen : false, 
      numbers : {
        total : null, 
        active: null,
        death: null,
        recover: null
      }
    }

    fetch('https://covid19-api.org/api/countries')
    .then(res => res.json())
    .then(data => {
        this.setState({countries : data})
    })
    
  }

  toggle() {
    this.setState({isOpen : !this.state.isOpen})
  }

  componentDidMount() {
    this.selectCountry('')
  }

  drawLineChart(cases, recovered, deaths) {
    var ctx = document.getElementById('lineChart').getContext('2d');
    this.state.lineChart = new Chart(ctx, { 
        type: 'line', 
        data: {
            datasets: [
                {
                  fill : false,
                  label: 'Cases',
                  backgroundColor: 'rgb(254, 219, 0)',
                  borderColor: 'rgb(254, 219, 0)',
                  data: cases,
                  pointRadius : 1.5
                }, 
                {
                  fill : false,
                  label: 'Recovered',
                  backgroundColor: 'rgb(11, 150, 0)',
                  borderColor: 'rgb(11, 150, 0)',
                  data: recovered,
                  pointRadius : 1.5
                },
                {
                  fill : false,
                  label: 'Death',
                  backgroundColor: 'rgb(219, 0, 0)',
                  borderColor: 'rgb(219, 0, 0)',
                  data: deaths,
                  pointRadius : 1.5
                },
            ]
        },

        options: {
          legend: {
              labels: {
                fontSize: 15
              }
          },
          responsive: true,
          scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'month'
                }
            }]
        }
        }
    });
  }

  drawPieChart(active, recovered, death) {
    var ctx = document.getElementById('pieChart').getContext('2d');
    this.state.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [active, recovered, death], 
                backgroundColor : ['rgb(255, 205, 86)','rgb(54, 162, 235)','rgb(255, 99, 132)']
            }],
            labels: [
                'Active',
                'Recovered',
                'Death'
            ],
            
        },
        
        options: {
          legend: {
            labels: {
                fontSize: 15
            }
        },
        }
    });
  }

 

  selectCountry(country) {
   
    fetch('https://covid19-api.org/api/timeline/'+country)
    .then(res => res.json())
    .then(data => {
      
      var cases     = []
      var deaths    = []
      var recovered = []
      
      for (var i=data.length-1; i>=0; i--) {
        var date = new Date(data[i].last_update)
        cases.push({
          x : date,
          y : data[i].cases || data[i].total_cases
        })

        deaths.push({
          x : date,
          y : data[i].deaths || data[i].total_deaths
        })
        recovered.push({
          x : date,
          y : data[i].recovered || data[i].total_recovered
        })
      }

      var currentRecovered = data[0].recovered || data[0].total_recovered
      var currentDeaths = data[0].deaths || data[0].total_deaths
      var currentCases = data[0].cases || data[0].total_cases
      var currentActive = currentCases - currentDeaths - currentRecovered

      this.setState({numbers : {
        total : currentCases, 
        active: currentActive,
        death: currentDeaths,
        recover: currentRecovered
      }})
      

      if(!this.state.lineChart) {
        this.drawLineChart(cases, recovered, deaths)
        this.drawPieChart(currentActive, currentRecovered, currentDeaths)
        return
      }
    
      
      
      var lineChart = this.state.lineChart
      lineChart.data.datasets[0].data = cases
      lineChart.data.datasets[1].data = recovered
      lineChart.data.datasets[2].data = deaths
      lineChart.update()

      var pieChart = this.state.pieChart
      pieChart.data.datasets[0].data = [currentActive, currentRecovered, currentDeaths]
      pieChart.update()

    });
  }

  
  render() {
    return (
       
            <Container fluid>

                <Row xs="1" sm="1" md="2" style={{backgroundColor : "#EDEDED"}}>   

                    <Col md={8}  className="d-flex justify-content-center mb-3 mt-3">
                        <div style={{width: '100%', height : '100%'}} className="shadow-lg p-3 bg-white rounded"> {/* border border-dark rounded*/}
                        
                            <canvas height="100%"  id="lineChart"></canvas>
                            <center><h5>Country timeline</h5></center>
                        </div>                    
                    </Col>  
              
                    <Col md={4} className="d-flex justify-content-center mb-3 mt-3">
                        <div style={{width: '100%', height : '100%'}} className="shadow-lg p-3 bg-white rounded">                   
                            <canvas   width="100%" id="pieChart"></canvas>
                            <center>                
                              <h5>Total cases: {this.state.numbers.total} </h5>
                              <h5 style={{color : "orange"}}>Active cases: {this.state.numbers.active} </h5>
                              <h5 style={{color : "green"}}>Recoverd: {this.state.numbers.recover} </h5>
                              <h5 style={{color : "red"}}>Death : {this.state.numbers.death} </h5>
                            </center>
                        </div>                  
                    </Col> 

                </Row>

               
                  
               
                

                <div  style={{  
                    position: 'fixed', 
                    bottom: '0px', 
                    right: '0px',
                    marginRight : '10px',
                    maxWidth : '30%'
                }}>
                  <h1>
                    <Input type="select" name="select" id="exampleSelect"  onChange={e => this.selectCountry(e.target.value)}>
                                  <option value={''}>World</option>
                                  
                                  {this.state.countries.map((value, index) => {
                                      return <option key={index} value={value.alpha2}>{value.name}</option>
                                  })}
                    </Input>
                  </h1>
                </div>

                


            </Container>
        
            


    );
}



}

export default Charts;

