import React, { Component } from "react";
import { Color, Box } from "ink";
import SelectInput from "ink-select-input";

class Infra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cmd: [
        { label: "Specs", value: "specs" },
        { label: "Services", value: "services" }
      ],
      specs: [],
      data: {},
      selectedSpec: "",
      stage: "CMD"
    };
  }

  handleCmdSelect = item => {
    this.setState({ stage: "LOADING" });
    this.runCmd(item.value);
  };

  handleSelect = item => {
    this.setState({ stage: "SELECTED", selectedSpec: item.value });
  };

  runCmd = async cmd => {
    if (cmd === "specs") {
      const data = await this.props.client.specs();
      let specs = [];
      data.forEach(item => {
        specs.push({
          label: item.metadata.name,
          value: item.metadata.name
        });
      });
      this.setState({ stage: "SPECS", specs: specs, data: data });
    }
  };

  GetSpec = name => {
    const specs = this.state.data.filter(item => item.metadata.name === name);
    return JSON.stringify(specs[0], null, 2);
  };

  render() {
    return (
      <div>
        {this.state.stage === "CMD" && (
          <SelectInput items={this.state.cmd} onSelect={this.handleCmdSelect} />
        )}
        {this.state.stage === "SPECS" && (
          <SelectInput items={this.state.specs} onSelect={this.handleSelect} />
        )}
        {this.state.stage === "SELECTED" && (
          <Box>
            <Color grey>{this.GetSpec(this.state.selectedSpec)}</Color>
          </Box>
        )}
      </div>
    );
  }
}

export default Infra;
