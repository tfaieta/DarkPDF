import * as React from "react";
import styled from "styled-components";

interface ToolbarProps {}

const Toolbar: React.SFC<ToolbarProps> = props => {
  return <Sidebar />;
};

export default Toolbar;

const Sidebar = styled.div`
  height: 100vh;
  width: 70px;
  float: top;
  left: 0;
  top: 0;
  background: #0f111a;
  position: absolute;
`;
