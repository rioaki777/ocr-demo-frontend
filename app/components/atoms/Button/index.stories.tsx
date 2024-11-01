import Button from './index';

export default {
  component: Button,
  title: 'Button',
};

export const Default = {
  args: {
    children: 'Default Button',
    size: 'md',
    color: 'primary',
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
    size: 'md',
    color: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    size: 'md',
    color: 'secondary',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    size: 'md',
    color: 'secondary',
    disabled: true,
  },
};
