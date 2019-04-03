// @flow
import React, { Component } from "react";
import { Box } from "ink";
import TextInput from "ink-text-input";

type Props = {
  onLogin: (name: string) => any
};
type State = {
  name: string
};

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    process.stdin.on("keypress", this.handleKeyPress);
  }

  handleKeyPress = (ch: any, key: any) => {
    if (key.name === "return") {
      let name = this.state.name;
      if (name === "") {
        name = "default";
      }
      this.props.onLogin(name);
    }
  };

  handleChange = (name: any) => {
    this.setState({ name });
  };

  render() {
    return (
      <Box>
        <Box marginRight={1}>Enter the infrastructure name (default):</Box>
        <TextInput value={this.state.name} onChange={this.handleChange} />
      </Box>
    );
  }
}

export default Login;
