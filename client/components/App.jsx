import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {



    };
  }

  render() {
    //const { isAuthenticated } = this.props.user;
    return (
      <Container fluid>
        <Row>
          <Col>
           LUDILOOOO
          </Col>
        </Row>
      </Container>
    );
  }
}
