// @flow
import React, { Component, Fragment } from "react";
import { Color, Box } from "ink";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";

type KeyValue = {
  label: string,
  value: string
};

type Props = {
  client: any,
  data: any
};

type State = {
  cmd: Array<KeyValue>,
  selectedCmd: string,
  stage: string
};

export class DeployService extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cmd: [
        { label: "Yes", value: "yes" },
        { label: "Cancel", value: "cancel" }
      ],
      selectedCmd: "",
      stage: "VIEW"
    };
  }

  handleSelect = (item: KeyValue) => {
    this.setState({ stage: "LOADING", selectedCmd: item.value });
    this.runCmd(item.value);
  };

  runCmd = async (cmd: string) => {
    if (cmd === "yes") {
      //TODO: manage error with a return status
      try {
        let service = await this.props.client.getService(
          this.props.data.metadata.name
        );
        //TODO: manage deploy result
        await service.deploy();
        this.setState({ stage: "DEPLOYED" });
      } catch (err) {
        console.error(err);
      }
    } else {
      //TODO: add cancel and error stage
      this.setState({ stage: undefined });
    }
  };

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        {this.state.stage === "VIEW" && (
          <Box flexDirection="column">
            <Box>------</Box>
            <Box alignItems="flex-start">
              <Box marginRight={3}>Flavor:</Box>
              <Color grey>{`${data.spec.flavor}`}</Color>
            </Box>
            <Box alignItems="flex-start">
              <Box marginRight={1}>Replicas:</Box>
              <Color grey>{`${data.spec.replicas}`}</Color>
            </Box>
            <Box alignItems="flex-start">
              <Box marginRight={2}>Version:</Box>
              <Color grey>{`${data.spec.version}`}</Color>
            </Box>
            <Box>--- Confirm Deploy ---</Box>
            <SelectInput items={this.state.cmd} onSelect={this.handleSelect} />
          </Box>
        )}
        {this.state.stage === "LOADING" && (
          <Color green>
            <Spinner type="dots" />
            Deploying...
          </Color>
        )}
        {this.state.stage === "DEPLOYED" && (
          <Color green>Service has been deployed</Color>
        )}
      </Fragment>
    );
  }
}
