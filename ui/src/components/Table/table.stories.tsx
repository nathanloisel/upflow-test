import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

import Table, { ColumnDefinition, ITableProps } from '.';
import { SortByField } from 'containers/ParaglindersContainer';

const COLUMN_LABELS = new Map<SortByField, ColumnDefinition>([
  ['name', { title: 'Modèle', type: 'string' }],
  ['brand', { title: 'Marque', type: 'string' }],
  [
    'CEN',
    { title: 'Certification EN', type: 'enum', enum: ['A', 'B', 'C', 'D'] },
  ],
  [
    'practice',
    {
      title: 'pratique',
      type: 'enum',
      enum: ['ecole', 'cross', 'hikeNfly', 'acro', 'comp'],
    },
  ],
  ['allon', { title: 'Allongement', type: 'float' }],
  [
    'ratio',
    {
      title: 'Finesse',
      type: 'range',
      range: [7, 12],
      rangeStep: 1,
    },
  ],
]);

export default {
  title: 'Table/Table',
  component: Table,
  decorators: [withDesign],
} as Meta;

const Template: Story<ITableProps<any>> = (args) => {
  return <Table {...args} />;
};

export const TableEx = Template.bind({});

TableEx.args = {
  data: [
    {
      name: '9cb3da02',
      brand: 'Nitracyr',
      allon: 4.77,
      CEN: 'B',
      practice: 'ecole',
      ratio: 11,
    },
    {
      name: '5b96396b',
      brand: 'Avit',
      allon: 6.07,
      CEN: 'A',
      practice: 'hikeNfly',
      ratio: 10,
    },
    {
      name: '94be658d',
      brand: 'Avit',
      allon: 5.6,
      CEN: 'A',
      practice: 'ecole',
      ratio: 11,
    },
    {
      name: '8fcc9ca2',
      brand: 'Avit',
      allon: 4.9,
      CEN: 'C',
      practice: 'cross',
      ratio: 11,
    },
    {
      name: 'dc7eaeeb',
      brand: 'Medmex',
      allon: 5.55,
      CEN: 'A',
      practice: 'hikeNfly',
      ratio: 11,
    },
    {
      name: '94c9a393',
      brand: 'Shadease',
      allon: 5.99,
      CEN: 'C',
      practice: 'hikeNfly',
      ratio: 11,
    },
    {
      name: '630d8e9c',
      brand: 'Accupharm',
      allon: 6.13,
      CEN: 'C',
      practice: 'cross',
      ratio: 11,
    },
    {
      name: 'ba7c3a21',
      brand: 'Nitracyr',
      allon: 5.98,
      CEN: 'C',
      practice: 'cross',
      ratio: 10,
    },
    {
      name: '3d73e27b',
      brand: 'Plasmox',
      allon: 6.2,
      CEN: 'A',
      practice: 'hikeNfly',
      ratio: 8,
    },
    {
      name: '89f7984f',
      brand: 'Plasmox',
      allon: 6.34,
      CEN: 'B',
      practice: 'ecole',
      ratio: 10,
    },
    {
      name: '25ca91ae',
      brand: 'Nitracyr',
      allon: 4.51,
      CEN: 'B',
      practice: 'hikeNfly',
      ratio: 10,
    },
    {
      name: '3909dae8',
      brand: 'Medmex',
      allon: 5.78,
      CEN: 'C',
      practice: 'ecole',
      ratio: 10,
    },
    {
      name: 'e790a0a5',
      brand: 'Medmex',
      allon: 6.07,
      CEN: 'B',
      practice: 'cross',
      ratio: 9,
    },
    {
      name: '394e43a4',
      brand: 'Avit',
      allon: 5.27,
      CEN: 'B',
      practice: 'ecole',
      ratio: 10,
    },
    {
      name: 'bd24040e',
      brand: 'Nitracyr',
      allon: 5.76,
      CEN: 'A',
      practice: 'hikeNfly',
      ratio: 10,
    },
    {
      name: 'd251296c',
      brand: 'Shadease',
      allon: 5.07,
      CEN: 'C',
      practice: 'ecole',
      ratio: 9,
    },
    {
      name: '93180fc7',
      brand: 'Accupharm',
      allon: 6.03,
      CEN: 'A',
      practice: 'ecole',
      ratio: 11,
    },
    {
      name: '8a2a2a8a',
      brand: 'Plasmox',
      allon: 6.06,
      CEN: 'C',
      practice: 'cross',
      ratio: 10,
    },
  ],
  columnLabels: COLUMN_LABELS,
  error: undefined,
  onNextPage: action('onNextPage'),
  onPrevPage: action('onPrevPage'),
  onSort: action('onSort'),
  pagination: {
    currentPage: 1,
    pageCount: 18,
    total: 18,
  },
  onDelete: action('onDelete'),
  onRowChange: action('onRowChange'),
};
