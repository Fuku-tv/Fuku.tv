import * as React from 'react';

import { Center, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Heading, DarkMode } from '@chakra-ui/react';
import useLeaderboardState from 'src/state/hooks/useLeaderboardState';
import LeaderboardPodium from './LeaderboardPodium/LeaderboardPodium';

const LeaderboardsScreen: React.FC = () => {
  const { state, actions } = useLeaderboardState();

  React.useEffect(() => {
    try {
      actions.getLeaderboard();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DarkMode>
      <Heading paddingTop={12}>Leaderboards</Heading>
      <Flex alignItems="center" wrap="wrap" direction="row">
        <TableContainer flexBasis="100%" maxWidth="665px">
          <Table variant="striped" colorScheme="blackAlpha" size="lg">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Username</Th>
                <Th isNumeric>score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {state.playerList.length <= 0 ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                state.playerList.slice(0, 10).map((user, index) => (
                  <Tr key={Math.random()}>
                    <Td>{index + 1}</Td>
                    <Td>{user.nickname}</Td>
                    <Td isNumeric>{user.points}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <LeaderboardPodium first={state.playerList[0]} second={state.playerList[1]} third={state.playerList[2]} />
      </Flex>
    </DarkMode>
  );
};

export default LeaderboardsScreen;
