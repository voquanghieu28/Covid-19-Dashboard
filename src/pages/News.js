import React, { useState, Component } from 'react';

import {
    Card, CardImg, CardText, CardGroup, CardBody, CardLink,
    CardTitle, CardSubtitle, Container, Row, Col, FormGroup,
    Label, Input, Alert
  } from 'reactstrap';


class News extends Component{

  constructor(props) {
    super(props);
    this.state = {
        data : null,
        countries : []
        
    }

    fetch('https://covid19-api.org/api/countries')
    .then(res => res.json())
    .then(data => {
        this.setState({countries : data})
    })
  }

  componentDidMount() {
    fetch("https://api.smartable.ai/coronavirus/news/CA", { headers : {'Subscription-Key' : '3009d4ccc29e4808af1ccc25c69b4d5d'}})
    .then( res => res.json() )
    .then((result) => {         
        this.setState({ 
          data : result.news
        })
      }, (error) => {
        this.setState({
          isLoaded : true,
          error
        })
      }
    )
  }

  selectCountry(code) {
    fetch("https://api.smartable.ai/coronavirus/news/"+code, { headers : {'Subscription-Key' : '3009d4ccc29e4808af1ccc25c69b4d5d'}})
    .then( res => res.json() )
    .then((result) => {         
        this.setState({ 
          data : result.news
        })
      }, (error) => {
        this.setState({
          isLoaded : true,
          error
        })
      }
    )
  }

  renderNews() {
    //console.log(this.state.data.length)
      if(this.state.data==null) return null
      if(this.state.data.length==0)
       return (
            <Alert color="danger"  className="mt-3">
                No news founded for selected country!
            </Alert>
        )
      return (
        <CardGroup>
                    <Row xs="1" sm="2" md="3" className="">
                
                        {
                            this.state.data.map((value, index) => { 
                                if(value.images!=null)   
                                    return <Col key={index}>
                                                <Card className="mt-3" style={{width:"100%", height:"95%"}}>
                                                <CardImg top width="100%" src={value.images[0].url} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle><h4>{value.title}</h4></CardTitle>
                                                        <CardSubtitle></CardSubtitle>
                                                        <CardText>{value.excerpt}</CardText>
                                                        <CardLink href={value.webUrl}>Read more</CardLink>
                                                    </CardBody>
                                                </Card>
                                            </Col>  
                            })
                        
                        }   
                    
                        
                    </Row>
                </CardGroup>
      )
  }

  render() {
    return (
        <div>
          
            <Container className="mt-3">

                
            <div style={{width : '100%', display: 'inline-block'}} >
                <div style={{float : 'right', width : '15%'}}>      
                
                    <Input id="selecting" type="select"  style={{}} onChange={e => this.selectCountry(e.target.value)}>
                        <option disabled selected>Filtering</option>
                        {this.state.countries.map((value, index) => {
                            return <option key={index} value={value.alpha2}>{value.name}</option>
                        })}
                    </Input>
                </div>
            </div>        

            
                
                {this.renderNews()}

            </Container>
        </div>
    );
}



}

export default News;