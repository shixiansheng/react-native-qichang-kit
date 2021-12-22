import React, { Component } from 'react';
import { ThemeContext } from './ThemeProvider';
import colors from './colors';
const defaultTheme: {
  colors: typeof colors;
  theme: 'light' | 'dark';
} = {
  colors: colors,
  theme: 'light',
};

const withTheme = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  return class WrappingComponent extends Component<Omit<P, 'theme'>> {
    static defaultProps: any = WrappedComponent.defaultProps;

    render() {
      return (
        <ThemeContext.Consumer>
          {(value) => {
            let theme = value || defaultTheme;
            //@ts-ignore
            return <WrappedComponent {...this.props} theme={theme} />;
          }}
        </ThemeContext.Consumer>
      );
    }
  };
};

export default withTheme;
