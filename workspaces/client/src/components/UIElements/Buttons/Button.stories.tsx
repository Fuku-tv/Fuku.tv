import type { Meta } from '@storybook/react';
import { templateForComponent } from 'src/components/Helpers/Helpers';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template = templateForComponent(Button);

export const Default = Template({
  label: 'Default',
  type: 'button',
});

export const Submit = Template({
  label: 'Default',
  type: 'submit',
});

export const Reset = Template({
  label: 'Default',
  type: 'reset',
});
