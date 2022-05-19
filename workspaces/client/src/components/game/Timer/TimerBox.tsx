import type { CSSObject } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: string | number;
};

const style: CSSObject = {
  fontSize: {
    base: '15px',
    md: '24px',
  },
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
  transform: 'translateY(0)',
  opacity: 1,
  transition: 'all 0.2s',
};

const TimerBox: React.FC<Props> = ({ children }) => (
  <Box sx={style}>
    <AnimatePresence>
      <motion.div
        key={children}
        exit={{ y: 75, opacity: 0, position: 'absolute' }}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </Box>
);

export default TimerBox;
