import tw from "twin.macro";

const Button = tw.button`
  inline-flex
  items-center 
  
  px-4 py-1 
  
  border
  border-main-rgba-5
  
  text-xs
  uppercase
  leading-4
  
  font-medium
  font-mono 
  rounded-lg 
  
  text-gray-400
  hover:text-gray-300

  bg-transparent
  hover:bg-main-rgba-8
  active:bg-main-rgba-7
  
  transition duration-150 ease-in-out

  cursor-pointer
`;

export default Button;
