import React, { Component } from "react";
import { Box, Color } from "ink";
import { Client } from "automium-sdk";
import Login from "./Login";
import Infra from "./Infra/Infra";

class Main extends Component {
  constructor(props) {
    super(props);
    //TODO: add config validation
    const client = new Client({
      baseUrl: props.config.url,
      auth: props.config.token
    });
    this.state = {
      stage: "LOGIN",
      client: client,
      infra: {}
    };
  }

  render() {
    return (
      <Box>
        {this.state.stage === "LOGIN" && <Login onLogin={this.Login} />}
        {this.state.stage === "INFRA" && <Infra client={this.state.infra} />}
        {this.state.stage === "ERROR" && <Color red>ERROR</Color>}
      </Box>
    );
  }

  Login = name => {
    if (name === "default") {
      const infra = this.state.client.infra(name);
      this.setState({ stage: "INFRA", infra: infra });
    } else {
      this.setState({ stage: "ERROR" });
    }
  };
}

export default Main;
