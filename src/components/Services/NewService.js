import React, { Component } from "react";
import { Box, Color } from "ink";
import TextInput from "ink-text-input";

class NewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: ["FLAVOR", "REPLICAS", "VERSION"],
      stage: "FLAVOR",
      data: props.data
    };
  }

  componentDidMount() {
    process.stdin.on("keypress", this.handleKeyPress);
  }

  handleKeyPress = (ch, key) => {
    if (key.name === "return") {
      let stage = this.state.stages.shift();
      this.setState({ stage: stage });
      //last command
      //TODO: add saving stage
      if (stage === undefined) {
        //TODO: addRawService to the sdk
        let service = this.props.client.addService(
          this.state.data.metadata.labels.app
        );
        service.data.spec = this.state.data.spec;
        service.save();
      }
    }
  };

  handleChange = value => {
    let data = this.state.data;
    if (this.state.stage === "FLAVOR") {
      data.spec.flavor = value;
    }
    if (this.state.stage === "REPLICAS") {
      data.spec.replicas = value;
    }
    if (this.state.stage === "VERSION") {
      data.spec.version = value;
    }
    this.setState({ data: data });
  };

  render() {
    const { data } = this.props;
    return (
      <Box flexDirection="column">
        <Box>---{`${data.metadata.name}`}---</Box>
        {this.state.stage === "FLAVOR" && (
          <Box>
            <Box marginRight={1}>Flavor:</Box>
            <TextInput
              value={this.props.data.spec.flavor}
              onChange={this.handleChange}
            />
          </Box>
        )}
        {this.state.stage === "REPLICAS" && (
          <Box>
            <Box marginRight={1}>Replicas:</Box>
            <TextInput
              value={this.props.data.spec.replicas.toString()}
              onChange={this.handleChange}
            />
          </Box>
        )}
        {this.state.stage === "VERSION" && (
          <Box>
            <Box marginRight={1}>Version:</Box>
            <TextInput
              value={this.props.data.spec.version}
              onChange={this.handleChange}
            />
          </Box>
        )}
        {this.state.stage === undefined && (
          <Color green>Service has been saved</Color>
        )}
      </Box>
    );
  }
}

export default NewService;
