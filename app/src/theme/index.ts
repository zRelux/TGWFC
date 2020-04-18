// import original module declarations
import { DefaultTheme } from 'styled-components';

import colors, { ColorsInterface } from './colors';
import spacing, { SpacingInterface } from './spacing';
import shadow, { ShadowInterface } from './shadow';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: SpacingInterface;
    colors: ColorsInterface;
    shadow: ShadowInterface;
  }
}

const theme: DefaultTheme = {
  colors,
  spacing,
  shadow
};

export default theme;
