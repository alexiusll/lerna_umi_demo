/*
 * @Author: linkenzone
 * @Date: 2021-07-05 09:34:53
 * @Descripttion: Do not edit
 */

import React from "react";
import { render } from "react-dom";

import Button from "./Button";

const App = () => (
  <>
    <Button color="red">第一个组件</Button>
  </>
);

render(<App />, document.getElementById("root"));

export { Button };
