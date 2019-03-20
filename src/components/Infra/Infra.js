import React, { Component } from "react";
import { Color } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import Spec from "../Specs/Spec";

class Infra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cmd: [
        { label: "Specs", value: "specs" },
        { label: "Services", value: "services" }
      ],
      specs: [],
      data: [],
      selectedSpec: "",
      selectedCmd: "",
      stage: "CMD"
    };
  }

  handleCmdSelect = item => {
    this.setState({ stage: "LOADING", selectedCmd: item.value });
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
    if (this.state.data.length === 0) {
      return {};
    }
    const data = this.state.data.filter(item => item.metadata.name === name);
    return data[0];
  };

  GetTextSpec = name => {
    const data = this.state.data.filter(item => item.metadata.name === name);
    return JSON.stringify(data[0], null, 2);
  };

  render() {
    const data = this.GetSpec(this.state.selectedSpec);
    return (
      <div>
        {this.state.stage === "LOADING" && (
          <Color green>
            <Spinner type="dots" />
            {` Loading ${this.state.selectedCmd}`}
          </Color>
        )}
        {this.state.stage === "CMD" && (
          <SelectInput items={this.state.cmd} onSelect={this.handleCmdSelect} />
        )}
        {(this.state.stage === "SPECS" || this.state.stage === "SELECTED") && (
          <SelectInput items={this.state.specs} onSelect={this.handleSelect} />
        )}
        {this.state.stage === "SELECTED" && <Spec data={data} />}
      </div>
    );
  }
}

export default Infra;
