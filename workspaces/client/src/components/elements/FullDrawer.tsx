import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react';

type Props = {
  show: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
};

/**
 * Drawer for mobile views of chat and navbar, children are positioned absolutely
 * @param props
 * @returns
 */
const FullDrawer = (props: Props) => (
  <Drawer
    isOpen={props.show}
    onClose={props.closeDrawer}
    placement="right"
    size="full"
    autoFocus={false}
    styleConfig={{
      baseStyle: {
        dialogContainer: {
          width: 0,
          zIndex: 2000,
        },
      },
    }}
  >
    <DrawerOverlay display="none" />
    <DrawerContent top="50px!important">
      <DrawerBody>
        <Box position="absolute" top={0} left={0} width="100%" height="100%">
          {props.children}
        </Box>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

export default FullDrawer;
