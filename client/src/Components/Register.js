import React from 'react'

import { register } from '../Api/UserActions'

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap'

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    register(userData).then(res => {
      this.props.history.push('/login')
    })



  }

  render() {

    return(
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Register</h2>
            <Form onSubmit={this.onSubmit} autoComplete="off">
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username} placeholder="Username..." />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email} placeholder="Email..." />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password} placeholder="Password..." />
              </FormGroup>
              <Button type="submit" color="info">Register</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register
