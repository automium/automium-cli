#!/usr/bin/env node

import "@babel/polyfill";
import React from "react";
import meow from "meow";
import { render } from "ink";
import Main from "./components/Main";

/* eslint-disable no-unused-vars */
const cli = meow(
  `
    Usage
      $ automium-cli  
  `
);
/* eslint-enable no-unused-vars */

const main = () => {
  let unmount; // eslint-disable-line prefer-const

  const onError = () => {
    unmount();
    process.exit(1);
  };

  const onExit = () => {
    unmount();
    process.exit();
  };

  unmount = render(<Main />, { onError, onExit });
};

main();
