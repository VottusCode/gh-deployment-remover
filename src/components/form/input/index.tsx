import tw from "twin.macro";

const Input = tw.input`
  bg-main-rgba-1
  focus:bg-main-rgba-2
  
  text-gray-400
  focus:text-gray-200 
  transition duration-150 ease-in-out 
  
  border-none
  focus:outline-none
  appearance-none

  rounded-lg
  px-4 py-2 
  
  placeholder-gray-500
  focus:text-gray-400

  rounded-t-md

  focus:z-10 
  sm:text-sm
`;

export default Input;
