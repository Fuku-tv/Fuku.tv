import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import FukuIcon from 'src/components/icons/FukuIcon';

const Header: React.FC = () => (
  <Center color="white" textAlign="center" flexDirection="column">
    <Box as="section" paddingY="50px">
      <Flex justifyContent="center" alignItems="center" lineHeight="11px" fontFamily="East Sea Dokdo, cursive" fontSize="88px">
        <Box display="inline-block" marginRight="8px">
          <FukuIcon />
        </Box>
        <Text>fuku</Text>
      </Flex>
      <Box paddingTop="20px">
        [ foo-koo ] •{' '}
        <Text as="span" fontWeight="bold">
          adjective
        </Text>
      </Box>
      <Box borderTop="1px solid #2c333a" paddingTop="20px" marginX="auto" marginTop="20px" maxWidth="800px">
        Fuku (pronounced foo-koo) is the romanization of the Japanese Kanji for “good fortune.”
      </Box>
    </Box>
    <Box as="section" paddingY="30px" id="team">
      <Heading as="h2">Team</Heading>
      <Flex flexWrap="wrap" justifyContent="space-evenly">
        <Box as="article" backgroundColor="#2e3136" margin="30px" padding="30px">
          <Heading as="h3" size="lg">
            Jason Pullara
          </Heading>
          <div>Founder</div>
        </Box>
        <Box as="article" backgroundColor="#2e3136" margin="30px" padding="30px">
          <Heading as="h3" size="lg">
            Ernie Francis
          </Heading>
          <div>IT Manager</div>
        </Box>
        <Box as="article" backgroundColor="#2e3136" margin="30px" padding="30px">
          <Heading as="h3" size="lg">
            James Oliva
          </Heading>
          <div>UI Manager</div>
        </Box>
      </Flex>
    </Box>
  </Center>
);
export default Header;
