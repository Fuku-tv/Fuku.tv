import * as React from 'react';
import SwitchCameraButton from 'src/components/UIElements/SwitchCameraButton/SwitchCameraButton';
import { Center, Divider, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react';
import VideoFeedSection from './VideoFeedSection/VideoFeedSection';
import ContentSection from './ContentSection/ContentSection';
import Sidebar from './Sidebar/Sidebar';
import CurrentlyWatching from './VideoFeedSection/SpectatorInformation/CurrentlyWatching/CurrentlyWatching';

const HomeScreen: React.FC = () => (
  <Grid color="white" paddingY={3} templateColumns={{ base: '1fr', md: '1fr minmax(auto, 365px)' }}>
    <GridItem>
      <Flex
        background="#111111"
        flexDirection="column"
        className="content-area"
        boxShadow="0px 0px 4px 0px #f3f3f30f"
        borderRadius="6px"
        overflow="hidden"
      >
        <HStack justifyContent="space-between" height="55px">
          <Center margin={4}>
            <CurrentlyWatching />
          </Center>

          <Center>
            <Heading as="h2" fontSize="15px" letterSpacing={1} lineHeight={1.5} height="22.5px" fontFamily="Inter, sans-serif" fontWeight={600}>
              Fuku Claw Game
            </Heading>
          </Center>

          <Center height="100%">
            <Divider orientation="vertical" height="60%" borderColor="whiteAlpha.600" />
            <SwitchCameraButton />
          </Center>
        </HStack>
        <VideoFeedSection />
        <ContentSection />
      </Flex>
    </GridItem>
    <GridItem>
      <Sidebar />
    </GridItem>
  </Grid>
);

export default HomeScreen;
