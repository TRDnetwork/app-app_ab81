import React from 'react';
import { Toast } from './Toast';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    autoDismiss: {
      control: 'number',
      description: 'Auto-dismiss delay in ms',
    },
    show: {
      control: 'boolean',
    },
  },
} as Meta<typeof Toast>;

const Template: StoryFn<typeof Toast> = (args) => {
  const [show, setShow] = React.useState(args.show);

  React.useEffect(() => {
    setShow(args.show);
  }, [args.show]);

  return (
    <div style={{ minHeight: '200px', position: 'relative' }}>
      <Toast {...args} show={show} onClose={() => setShow(false)} />
      <button
        onClick={() => setShow(true)}
        style={{
          marginTop: '100px',
          padding: '10px 20px',
          background: '#e66000',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'Form submitted successfully!',
  autoDismiss: 4000,
  show: false,
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'Failed to send message. Please try again.',
  autoDismiss: 5000,
  show: false,
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'Please review your input.',
  autoDismiss: 3000,
  show: false,
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'New update available.',
  autoDismiss: 4000,
  show: false,
};