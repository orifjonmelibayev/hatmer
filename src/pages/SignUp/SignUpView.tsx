import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { useState } from 'react'
import { loginWithEmail, signupWithEmail } from '../../utils/firebase'
import { OAuthButtonGroup } from './OAuthButtonGroup'
import { PasswordField } from './PasswordField'
import { useForm } from "react-hook-form";

export const SignUpView = () => {

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState<string|null>(null)

  function onSubmit(v: any) {
    console.log(JSON.stringify(v))
    return signupWithEmail(v.email, v.password, v.displayName)
      .then(() => {
        // Profile updated!
        // ...
        setError(null);
      })
      .catch((error) => {
        // An error occurred
        // ...
        setError(JSON.stringify(error));
      });;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                Sign up
              </Heading>
            </Stack>
          </Stack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {/* <AlertTitle mr={2}>{Sign }</AlertTitle> */}
              <AlertDescription>{error}</AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setError(null)}
              />
            </Alert>
          )}
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormControl id="displayName">
                  <FormLabel htmlFor="displayName">Name</FormLabel>
                  <Input type="text" {...register("displayName")} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    {...register("email", { required: true })}
                  />
                </FormControl>
                <PasswordField
                  isRequired
                  id="password"
                  {...register("password", { required: true })}
                />
              </Stack>

              <Stack spacing="6">
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign up
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};
