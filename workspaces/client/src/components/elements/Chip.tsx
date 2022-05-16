/* eslint-disable react/jsx-props-no-spreading */
import type { ColorProps, FlexProps } from '@chakra-ui/react';
import { forwardRef, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string;
  value: string | number;
  primary: ColorProps['color'];
  secondary: ColorProps['color'];
};

const Chip = forwardRef<FlexProps & Props, 'div'>((props, ref) => (
  <Flex alignItems="baseline" backgroundColor={props.primary} borderRadius="full" paddingLeft={2} paddingRight={0} fontSize={11} ref={ref} {...props}>
    <Text paddingRight={1}>{props.title}</Text>
    <Text padding="5px 8px" backgroundColor={props.secondary} borderRadius="full" height="100%">
      {props.value}
    </Text>
  </Flex>
));

export default Chip;
