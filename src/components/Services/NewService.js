import React, { Component } from "react";
import { Color, Box } from "ink";

class NewService extends Component {
  render() {
    const { data } = this.props;
    return (
      <Box flexDirection="column">
        <Box>---{`${data.metadata.name}`}---</Box>
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

export default NewService;
