import * as React from 'react';

export interface IErrorProps {
  error: string;
}

const Error: React.FC<IErrorProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default Error;
