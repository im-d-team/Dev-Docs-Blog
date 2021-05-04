import * as React from "react";

export default function Layout({ children }) {
  console.log(children)
  return (
    <div>
      <h1>My Layout</h1>
      <div>{children}</div>
    </div>
  );
}
