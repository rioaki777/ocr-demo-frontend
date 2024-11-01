import Input from './index';

export default {
  component: Input,
  title: 'Input',
};

export const Default = {
  args: {
    placeholder: 'Default Input',
    size: 'md',
  },
};

export const Error = {
  args: {
    placeholder: 'Error Button',
    size: 'md',
    isError: true,
  },
};
