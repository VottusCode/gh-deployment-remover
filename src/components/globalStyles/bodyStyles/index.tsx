import { css, Global } from "@emotion/react";
import tw from "twin.macro";

const BodyStyles = () => (
  <Global
    styles={css`
      body {
        font-family: "IBM Plex Sans", sans-serif;
        ${tw`m-0 min-w-full min-h-full w-screen h-screen bg-main`}
      }
      #root {
        ${tw`w-full h-full`}
      }
    `}
  />
);

export default BodyStyles;
