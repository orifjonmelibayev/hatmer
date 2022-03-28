import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const CardContent = (props: BoxProps) => <Box bg={useColorModeValue('white', 'gray.600')} {...props} />
