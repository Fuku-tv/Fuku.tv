import { Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: string | number;
};

const TimerBox: React.FC<Props> = ({ children }) => (
  <Flex
    fontSize={{ base: '15px', md: '24px' }}
    width="100%"
    height="100%"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    fontWeight="bold"
  >
    <AnimatePresence>
      <motion.div
        key={children}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 75, opacity: 0, position: 'absolute' }}
        transition={{
          ease: 'easeOut',
          duration: 1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </Flex>
);

export default TimerBox;
