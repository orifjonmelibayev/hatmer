import { Box, Flex, FlexProps, HStack, StackProps, useColorModeValue } from '@chakra-ui/react'
import {ReactNode} from 'react'

interface Props extends StackProps {
  label?: string | ReactNode,
  value?: string | ReactNode
}

export const Property = (props: Props) => {
  const { label, children,...stackProps } = props
  return (
    <HStack
      px="6"
      py="4"
      display="flex"
      alignItems="flex-start"
      _even={{ bg: useColorModeValue("gray.50", "gray.600") }}
      {...stackProps}
    >
      <Box minWidth="50px">{label}</Box>
      <Box fontWeight="semibold" pl={4}>
        {children}
      </Box>
    </HStack>
  );
}
