import { Box, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
  title: string;
  descriptionStart: string;
  descriptionEnd?: string;
  dynamicNumber?: string | number;
}

const TitleDescription: React.FC<Props> = ({ title, descriptionStart, descriptionEnd, dynamicNumber }) => {
  const extendedContent = (
    <>
      <Text
        as="span"
        marginX="6px"
        paddingX="3px"
        borderRadius="2px"
        color="#7a61a1"
        border="1px solid #7a61a1"
        fontWeight={500}
        className="inline-number"
      >
        {dynamicNumber}
      </Text>
      {descriptionEnd}
    </>
  );

  return (
    <Box paddingBottom="20px" textAlign="center">
      <Box>
        <Heading as="h2" fontWeight={600} fontSize={{ base: '18px', md: '22px' }}>
          {title}
        </Heading>
        <Text marginTop="10px" fontSize={{ base: '13px', md: '15px' }}>
          {descriptionStart}

          {descriptionEnd && extendedContent}
        </Text>
      </Box>
    </Box>
  );
};

export default TitleDescription;
