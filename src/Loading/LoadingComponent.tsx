import React, { Component } from 'react';
import Loading from './Loading';
import ErrorComponent from '../ErrorComponent';
//import * as Sentry from '@sentry/react-native'

type LoadingComponentProps<T> = {
  render: (data: T) => React.ReactNode;
  fetchData: () => Promise<T>;

  showLoading?: boolean; //是否显示加载动画,默认显示
};

type State<T> = {
  isLoading: boolean;
  error: boolean;
  errorInfo?: string;
  data: T | undefined;
};

class LoadingComponent<T> extends Component<
  LoadingComponentProps<T>,
  State<T>
> {
  static defaultProps = {
    showLoading: true,
  };

  state = {
    isLoading: true,
    error: false,
    errorInfo: undefined,
    data: undefined,
  };

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    console.log('_fetchData');

    if (!this.state.isLoading) {
      this.setState({
        error: false,
        isLoading: true,
      });
    }

    const currentTime = new Date().getTime();

    this.props.fetchData().then(
      (data) => {
        this.setState({
          isLoading: false,
          error: false,
          data: data,
        });
      },
      (error) => {
        console.log('_fetchData:error');
        //Sentry.captureException(error);

        const interval = new Date().getTime() - currentTime;
        const timeOut = interval > 500 ? 0 : 500 - interval;

        let errorInfo = error && error.msg ? error.msg : undefined;

        setTimeout(() => {
          this.setState({
            isLoading: false,
            error: true,
            errorInfo,
          });
        }, timeOut);
      }
    );
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorComponent
          errorInfo={this.state.errorInfo}
          onPress={() => {
            this._fetchData();
          }}
        />
      );
    } else if (this.state.isLoading) {
      return this.props.showLoading ? <Loading /> : null;
    } else {
      return this.props.render((this.state.data as unknown) as T);
    }
  }
}

export default LoadingComponent;
