import React, { SFC } from "react";
import Logo from "../assets/Logo.svg";
import styled from "styled-components";
import Hero from "./Hero/Hero";

interface AppProps {}

const App: SFC<AppProps> = () => (
  <Container>
    <Hero />
  </Container>
);

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  margin: auto;
  justify-content: center;
  align-items: center;

  background: black;
`;
