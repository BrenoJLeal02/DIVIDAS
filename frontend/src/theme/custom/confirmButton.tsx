import { Button, useColorModeValue } from "@chakra-ui/react";
import {
    L_BG, D_BG,
    L_BG_HOVER, D_BG_HOVER
} from './colors'

interface ConfirmButtonProps {
  loading: boolean,
  text: string
}

function ConfirmButton({ loading, text }: ConfirmButtonProps) {
  return (
    <Button
      fontSize="sm"
      variant="brand"
      fontWeight="500"
      w="100%"
      h="50"
      mb="24px"
      type="submit"
      color={useColorModeValue("white", "gray.800")}
      isLoading={loading}
      bg={useColorModeValue(L_BG, D_BG)}
      _hover={{ bg: useColorModeValue(L_BG_HOVER, D_BG_HOVER) }}
      boxShadow="none"
    >
        { text }
    </Button>
  );
}

export default ConfirmButton;
