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

export default class AppLayout extends Component {
    constructor (props) {
        super(props);
        this.state = {


        };
    }

    render() {
        //const { isAuthenticated } = this.props.user;
        return (

                        <Navbar sticky="top" bg="light" variant="light" expand="lg">
                            <Navbar.Brand>Questions and Answers</Navbar.Brand>

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Col />
                                <Nav
                                    fill
                                    variant="tabs"
                                    defaultActiveKey="/home"
                                    className="mr-auto"
                                >
                                    <Nav.Item>
                                        <Nav.Link>Home</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link>Questions</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
        );
    }
}
