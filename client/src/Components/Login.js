import React from 'react'

import { login } from '../Api/UserActions'

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert } from 'reactstrap'

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    login(userData)
    .then(res => {
      if (res.token) {
        this.props.history.push('/home')
      }

      if (res.error) {
        this.setState({
          error: res.error
        });
      }
    })

  }

  render() {

    return(
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Login</h2>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email} placeholder="Email..." />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password} placeholder="Password..." />
              </FormGroup>
              <Button type="submit" color="primary">Login</Button>
              { this.state.error ?
                <Alert color="danger" className="mt-3">
                  { this.state.error }
                </Alert> : ''
              }
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

export default Login
