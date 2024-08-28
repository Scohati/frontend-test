import React, { type ReactNode } from "react";

const Stack = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default Stack;
