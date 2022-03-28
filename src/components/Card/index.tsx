import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('gray.50', 'gray.700')}
    rounded={{ md: 'lg' }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)
