export interface ShadowInterface {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
  shadowCss: string;
}

const shadow: ShadowInterface = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
  shadowCss: `
    elevation: 4;
    box-shadow: 0 2px 2.62px rgba(0, 0, 0, 0.16);
  `
};

export default shadow;
