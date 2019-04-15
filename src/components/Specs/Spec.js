// @flow
import React, { Component } from "react";
import { Color, Box } from "ink";

type Props = {
  data: any
};

type State = {};

class Spec extends Component<Props, State> {
  render() {
    const { data } = this.props;
    return (
      <Box flexDirection="column">
        <Box>------</Box>
        <Box alignItems="flex-start">
          <Box marginRight={2}>Service:</Box>
          <Color grey>{`${data.metadata.labels["app"]}`}</Color>
        </Box>
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
      </Box>
    );
  }
}

export default Spec;
