import React, { SFC } from "react";
import Logo from "../assets/Logo.svg";
import styled from "styled-components";
import Hero from "./Hero/Hero";
import Toolbar from "./Toolbar/Toolbar";

interface AppProps {}

const App: SFC<AppProps> = () => (
  <div>
    <Container>
      <Toolbar />
      <Hero />
    </Container>
  </div>
);

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding-top: 25%;

  background: #090b10;
`;
