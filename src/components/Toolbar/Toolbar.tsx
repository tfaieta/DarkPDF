import * as React from "react";
import styled from "styled-components";
import { Icon } from "antd";

interface ToolbarProps {}

const Toolbar: React.SFC<ToolbarProps> = props => {
  return (
    <Sidebar>
      <IconList>
        {icons.map((icon, index) => {
          return <StyledIcon type={icon} key={index} />;
        })}
      </IconList>
    </Sidebar>
  );
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
  padding-top: 30px;
`;

const IconList = styled.div`
  display: grid;
`;

const StyledIcon = styled(Icon)`
  font-size: 25px;
  color: #08c;
  margin: 15px 0;
`;

const icons = ["zoom-in", "zoom-out", "book", "github"];
