#!/usr/bin/env node

import "@babel/polyfill";
import React from "react";
import meow from "meow";
import { render } from "ink";
import Main from "./components/Main";

const cli = meow(
  `
    Usage
      $ automium-cli  

    Options
      --url, -u   Set the Automium endpoint
      --token, -t Use an authentication token
  `,
  {
    flags: {
      url: {
        type: "string",
        alias: "u"
      },
      token: {
        type: "string",
        alias: "t"
      }
    }
  }
);

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

  unmount = render(<Main config={cli.flags} />, { onError, onExit });
};

main();
