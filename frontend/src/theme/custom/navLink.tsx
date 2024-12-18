import { NavLink } from "react-router-dom";
import { Text, useColorModeValue } from "@chakra-ui/react";
import {
  L_BG, D_BG,
  L_BG_HOVER, D_BG_HOVER
} from './colors'

interface NavigationLinkProps {
  text: string
  route: string
}

function NavigationLink({ text, route }: NavigationLinkProps) {
  return (
    <NavLink to={ route }>
      <Text
        color={useColorModeValue(L_BG, D_BG)}
        fontSize='sm'
        as='span'
        w='132px'
        _hover={{
          color: useColorModeValue(L_BG_HOVER, D_BG_HOVER)
        }}
        fontWeight='500'>
        { text }
      </Text>
    </NavLink>
  );
}

export default NavigationLink;
