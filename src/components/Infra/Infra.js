import React, { Component } from "react";
import { Color } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
import Spec from "../Specs/Spec";
import NewService from "../Services/NewService";

class Infra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cmd: [
        { label: "Specs", value: "specs" },
        { label: "Services", value: "services" },
        { label: "Add Service", value: "add" }
      ],
      data: [],
      services: [],
      selectedService: "",
      selectedCmd: "",
      stage: "CMD"
    };
  }

  handleCmdSelect = item => {
    this.setState({ stage: "LOADING", selectedCmd: item.value });
    this.runCmd(item.value);
  };

  handleSelect = item => {
    if (this.state.selectedCmd === "add") {
      this.setState({ stage: "ADD", selectedService: item.value });
    } else {
      this.setState({ stage: "SELECTED", selectedService: item.value });
    }
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
      this.setState({ stage: "SERVICES", services: specs, data: data });
    }
    if (cmd === "services") {
      const data = await this.props.client.services();
      let services = [];
      data.forEach(item => {
        services.push({
          label: item.data.metadata.name,
          value: item.data.metadata.name
        });
      });
      this.setState({ stage: "SERVICES", services: services, data: data });
    }
    if (cmd === "add") {
      const data = this.props.client.catalog;
      let services = [];
      data.forEach(item => {
        services.push({
          label: item.metadata.labels.app,
          value: item.metadata.labels.app
        });
      });
      this.setState({ stage: "SERVICES", services: services, data: data });
    }
  };

  GetData = (name, cmd) => {
    if (this.state.data.length === 0) {
      return {};
    }
    if (cmd === "specs") {
      const data = this.state.data.filter(item => item.metadata.name === name);
      return data[0];
    }
    if (cmd === "services") {
      const services = this.state.data.filter(
        item => item.data.metadata.name === name
      );
      return services[0].data;
    }
    if (cmd === "add") {
      const data = this.state.data.filter(
        item => item.metadata.labels.app === name
      );
      return data[0];
    }
  };

  render() {
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
        {(this.state.stage === "SERVICES" ||
          this.state.stage === "SELECTED") && (
          <SelectInput
            items={this.state.services}
            onSelect={this.handleSelect}
          />
        )}
        {this.state.stage === "SELECTED" && (
          <Spec
            data={this.GetData(
              this.state.selectedService,
              this.state.selectedCmd
            )}
          />
        )}
        {this.state.stage === "ADD" && (
          <NewService
            client={this.props.client}
            data={this.GetData(
              this.state.selectedService,
              this.state.selectedCmd
            )}
          />
        )}
      </div>
    );
  }
}

export default Infra;
