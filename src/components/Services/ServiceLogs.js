// @flow
import React, { Component, Fragment } from "react";
import { Color, Text, Static } from "ink";
import Spinner from "ink-spinner";

type Props = {
  service: any
};

type State = {
  logs: any,
  stage: string
};

export class ServiceLogs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      logs: "",
      stage: "LOADING"
    };
  }

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    let data = await this.props.service.logs();
    this.setState({ stage: "VIEW", logs: data });
  };

  render() {
    const { logs } = this.state;
    return (
      <div>
        <Text>{logs}</Text>
        {this.state.stage === "LOADING" && (
          <Color green>
            <Spinner type="dots" />
            Loading...
          </Color>
        )}
      </div>
    );
  }
}
