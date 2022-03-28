import { Box, Flex, Heading } from '@chakra-ui/react'
import * as React from 'react'

interface Props {
  title: string,
  subtitle?: string,
  action?: React.ReactNode
}

export const CardHeader = (props: Props) => {
  const { title, subtitle, action } = props
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Box>
        <Heading fontSize="lg">{title}</Heading>
        <Heading fontSize="md">{subtitle}</Heading>
      </Box>
      {action}
    </Flex>
  );
}
