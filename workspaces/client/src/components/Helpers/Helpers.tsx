/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import type { Story } from '@storybook/react';

import type { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

export const templateForComponent =
  <P,>(Component: (props: P) => StoryFnReactReturnType) =>
  (props: P): Story<P> => {
    const template: Story<P> = (args) => <Component {...args} />;
    const story = template.bind({});
    story.args = props;
    return story;
  };

export default {};
