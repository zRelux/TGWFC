export interface ColorsInterface {
  primary: string;
  secondary: string;
  tertiary: string;
  primaryText: string;
  error: string;
  [key: string]: string;
}

const colors: ColorsInterface = {
  primary: '#414141',
  secondary: '#5d5d5d',
  tertiary: '#838383',
  primaryText: '#f2f2f2',
  error: '#eb5050'
};

export default colors;
