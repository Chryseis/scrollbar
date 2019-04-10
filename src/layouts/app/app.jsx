/**
 * Created by Administrator on 2017/12/10.
 */
import './app.less';

import React from 'react'
import faker from 'faker'
import ScrollBar from './ScrollBar';

const PAGE_SIZE = 30;
const PAGE_COUNT = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: true,
      isNextPageLoading: false,
      items: []
    };
  }

  _initPage = () => {
    return new Promise(resolve => {
      this.setState({ isNextPageLoading: true }, () => {
        setTimeout(() => {
          this.setState(() => ({
            hasNextPage: true,
            isNextPageLoading: false,
            items: new Array(PAGE_SIZE).fill(true).map(() => ({ name: faker.name.findName() }))
          }));
          resolve(1);
        }, 2500);
      });
    });
  };

  _loadNextPage = (...args) => {
    return new Promise(resolve => {
      this.setState({ isNextPageLoading: true }, () => {
        setTimeout(() => {
          this.setState(state => ({
            hasNextPage: state.items.length < PAGE_COUNT,
            isNextPageLoading: false,
            items: [...state.items].concat(
                new Array(PAGE_SIZE).fill(true).map(() => ({ name: faker.name.findName() }))
            )
          }));
          resolve(1);
        }, 2500);
      });
    });
  };

  render() {
    const { hasNextPage, isNextPageLoading, items } = this.state;
    return <div className="app">
      <ScrollBar hasNextPage={hasNextPage}
                 isNextPageLoading={isNextPageLoading}
                 items={items}
                 loadNextPage={this._loadNextPage}
                 initPage={this._initPage}
      />
    </div>
  }
}

export default App