import * as React from "react";
import Logo from "../../assets/Logo.svg";
import styled from "styled-components";

interface HeroProps {}

const Hero: React.SFC<HeroProps> = props => {
  return (
    <div>
      <DarkPDFLogo src={Logo} />
      <Header>DarkPDF</Header>
      <Subtitle>Drop in a PDF or Browse</Subtitle>
    </div>
  );
};

export default Hero;

const DarkPDFLogo = styled.img``;

const Header = styled.h1``;

const Subtitle = styled.p``;
