import React from 'react';
import { Container } from './styles';

interface ScreenContainerProps {}

const ScreenContainer: React.FunctionComponent<ScreenContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ScreenContainer;
