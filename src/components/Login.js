import React, { Component } from "react";
import { Box } from "ink";
import TextInput from "ink-text-input";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    process.stdin.on("keypress", this.handleKeyPress);
  }

  handleKeyPress = (ch, key) => {
    if (key.name === "return") {
      let name = this.state.name;
      if (name === "") {
        name = "default";
      }
      this.props.onLogin(name);
    }
  };

  handleChange = name => {
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
