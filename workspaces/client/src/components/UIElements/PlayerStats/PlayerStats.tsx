import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import Chip from 'src/components/elements/Chip';

interface Props {
  points: number;
  credits: number;
  freeplay: number;
}

const PlayerStats: React.FC<Props> = (props) => (
  <Flex
    position="absolute"
    bottom={0}
    width="100%"
    paddingY="15px"
    alignItems="center"
    justifyContent="space-between"
    lineHeight="14px"
    textAlign="center"
    color="white"
    zIndex={300}
    padding="5px"
    transition="600ms"
  >
    <Chip fontWeight="bold" textColor="black" title="My Points" value={props.points} titleColor="#bd9e3c" valueColor="#d4bf39" />

    <Flex>
      <Chip marginLeft={2} title="Credits:" value={props.credits} titleColor="#7a61a18a" valueColor="#7a61a1" />
      <Chip marginLeft={2} title="Freeplay:" value={props.freeplay} titleColor="#7a61a18a" valueColor="#7a61a1" />
    </Flex>
  </Flex>
);
export default PlayerStats;
