// @flow
import React, { Component } from "react";
import { Box, Color } from "ink";
import { Client, ClientOptions } from "automium";
import Login from "./Login";
import Infra from "./Infra/Infra";

type Props = {
  config: any
};
type State = {
  stage: string,
  client: any,
  infra: any
};

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const options: ClientOptions = {
      baseUrl: props.config.url,
      auth: props.config.token
    };
    const client = new Client(options);
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

  Login = (name: string) => {
    if (name === "default") {
      const infra = this.state.client.infra(name);
      this.setState({ stage: "INFRA", infra: infra });
    } else {
      this.setState({ stage: "ERROR" });
    }
  };
}

export default Main;
