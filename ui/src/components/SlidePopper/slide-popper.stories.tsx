import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import SlidePopper, { ISlidePopperProps } from '.';

export default {
  title: 'Inputs/SlidePopper',
  component: SlidePopper,
  decorators: [withDesign],
} as Meta;

const Template: Story<ISlidePopperProps> = (args) => {
  return <SlidePopper {...args} />;
};

export const SlidePopperEx = Template.bind({});

SlidePopperEx.args = {
  colDef: {
    range: [7, 12],
    rangeStep: 1,
    title: 'test',
    type: 'range',
  },
  inputValue: 8,
  onChange: action('onChange'),
};
