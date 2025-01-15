import { randomUUID } from "crypto";

  
  export const generateRandomExample = () => {
    return {
      name: 'fake name' + randomUUID(),
      description: 'lorem ipsum',

    };
  };
  
