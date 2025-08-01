import { MyInfo } from "./components/MyInfo";
import Header from "./Header";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Certificates } from "./components/Certificates";
import { Box, Divider } from "@mui/material";
import Footer from "./Footer";
import { Portfolio } from "./components/Portfolio";

function App() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Header></Header>
        <Divider></Divider>
        <MyInfo></MyInfo>
        <Divider></Divider>
        <Portfolio></Portfolio>
        <Divider></Divider>
        <Experience></Experience>
        <Divider></Divider>
        <Skills></Skills>
        <Divider></Divider>
        <Certificates></Certificates>
        <Divider></Divider>
        <Footer></Footer>
      </Box>
    </>
  );
}

export default App;
