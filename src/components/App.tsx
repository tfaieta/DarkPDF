import React, { SFC } from "react";
import { theme } from "../styles/themes";
import Logo from "../assets/Logo.svg";
import { Grommet, Box, Image, Form, FormField, Button } from "grommet";

interface AppProps {}

const App: SFC<AppProps> = () => (
  <div>
    <Grommet theme={theme}>
      <Box direction="row-responsive" justify="center" align="center">
        <Box
          justify="center"
          align="center"
          height="large"
          width="large"
          background="black"
          round="false"
          gap="large"
        >
          <Image src={Logo} />
          <Form onSubmit={() => console.log("Submit")}>
            <FormField
              label="Name"
              name="name"
              required
              validate={{ regexp: /^[a-z]/i }}
            />
            <FormField
              label="Username"
              name="employeeId"
              required
              validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
            />
            <FormField
              label="Password"
              name="password"
              required
              validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
            />
          </Form>
          <Button label="Sign Up" onClick={() => {}} />
        </Box>
      </Box>
    </Grommet>
  </div>
);

export default App;
