import * as React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './style';

export interface ILoadingProps {}

const Loading: React.FC<ILoadingProps> = (props) => {
  return (
    <Container>
      <ReactLoading type="cubes" color="#212121" />
    </Container>
  );
};

export default Loading;
