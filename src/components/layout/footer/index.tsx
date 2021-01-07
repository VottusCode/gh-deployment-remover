import Link from "../../elements/link";
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";

const Footer = () => (
  <footer tw="mt-8 text-xs font-mono text-gray-500 text-center">
    2020 &copy; Mia "VottusCode" &ndash; Licensed under MIT &ndash;{" "}
    <Link href="https://github.com/VottusCode/gh-environment-remover">
      Source Code
    </Link>
  </footer>
);

export default Footer;
