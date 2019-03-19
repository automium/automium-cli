import React, { Component } from "react";
import { Box, Color } from "ink";
import { Client } from "automium-sdk";
import Login from "./Login";
import Infra from "./Infra/Infra";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "LOGIN",
      infra: "",
      client: null
    };
  }

  render() {
    return (
      <Box>
        {this.state.stage === "LOGIN" && <Login onLogin={this.Login} />}
        {this.state.stage === "INFRA" && (
          <Infra name={this.state.infra} client={this.state.client} />
        )}
        {this.state.stage === "ERROR" && <Color red>ERROR</Color>}
      </Box>
    );
  }

  Login = name => {
    if (name === "default") {
      //TODO: set client options
      const client = new Client({
        baseUrl: "",
        auth: ""
      });
      const infra = client.infra(name);
      this.setState({ stage: "INFRA", infra: name, client: infra });
    } else {
      this.setState({ stage: "ERROR" });
    }
  };
}

export default Main;
