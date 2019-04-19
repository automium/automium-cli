// @flow
import React, { Component } from "react";
import { Box, Color } from "ink";
import TextInput from "ink-text-input";

type Props = {
  client: any,
  data: any
};

type State = {
  stages: Array<string>,
  stage: string,
  data: any,
  env: number
};

export class NewService extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    //set expected stages
    let stages = ["NAME", "FLAVOR", "REPLICAS", "VERSION"];
    if (props.data.spec.env.length > 0) stages.push("ENV");

    this.state = {
      stages: stages,
      stage: stages[0],
      data: props.data,
      env: 0
    };
  }

  componentDidMount() {
    process.stdin.on("keypress", this.handleKeyPress);
  }

  handleKeyPress = (ch: any, key: any) => {
    if (key.name === "return") {
      if (this.state.stage === "ENV") {
        let nextEnv = this.state.env + 1;
        if (nextEnv < this.state.data.spec.env.length) {
          //process next env
          this.setState({ env: nextEnv });
        } else {
          //finish
          this.setState({ stage: undefined });
        }
      } else {
        //process next stage
        let stage = this.state.stages.shift();
        this.setState({ stage: stage });
      }
      //last command
      //TODO: add saving stage
      if (this.state.stage === undefined) {
        //TODO: addRawService to the sdk
        //TODO: add spinner
        let service = this.props.client.addService(
          this.state.data.metadata.labels.app
        );
        service.data.spec = this.state.data.spec;
        //TODO: manage save result (add await)
        service.save();
        //TODO: stop the spinner
      }
    }
  };

  handleChange = (value: string) => {
    let data = this.state.data;
    if (this.state.stage === "NAME") {
      data.metadata.name = value;
    }
    if (this.state.stage === "FLAVOR") {
      data.spec.flavor = value;
    }
    if (this.state.stage === "REPLICAS") {
      data.spec.replicas = Number(value);
    }
    if (this.state.stage === "VERSION") {
      data.spec.version = value;
    }
    if (this.state.stage === "ENV") {
      data.spec.env[this.state.env].value = value;
    }
    this.setState({ data: data });
  };

  render() {
    const { data } = this.props;
    return (
      <Box flexDirection="column">
        {this.state.stage === "NAME" && (
          <Box>
            <Box marginRight={1}>Name:</Box>
            <TextInput
              value={data.metadata.name}
              onChange={this.handleChange}
            />
          </Box>
        )}
        {this.state.stage === "FLAVOR" && (
          <Box>
            <Box marginRight={1}>Flavor:</Box>
            <TextInput value={data.spec.flavor} onChange={this.handleChange} />
          </Box>
        )}
        {this.state.stage === "REPLICAS" && (
          <Box>
            <Box marginRight={1}>Replicas:</Box>
            <TextInput
              value={data.spec.replicas.toString()}
              onChange={this.handleChange}
            />
          </Box>
        )}
        {this.state.stage === "VERSION" && (
          <Box>
            <Box marginRight={1}>Version:</Box>
            <TextInput value={data.spec.version} onChange={this.handleChange} />
          </Box>
        )}
        {this.state.stage === "ENV" && (
          <Box>
            <Box marginRight={1}>{data.spec.env[this.state.env].name}</Box>
            <TextInput
              value={data.spec.env[this.state.env].value}
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
