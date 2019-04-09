/**
 * Created by Administrator on 2017/12/10.
 */
import './app.less';

import React from 'react'
import faker from 'faker'
import ScrollBar from './ScrollBar';
import ExampleWrapper from './ExampleWrapper'

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
            this.setState({ isNextPageLoading: true, items: [] }, () => {
                setTimeout(() => {
                    this.setState(state => ({
                        hasNextPage: state.items.length < 500,
                        isNextPageLoading: false,
                        items: [...state.items].concat(
                            new Array(30).fill(true).map(() => ({ name: faker.name.findName() }))
                        )
                    }));
                    resolve(1);
                }, 2500);
            });
        });
    };

    _loadNextPage = (...args) => {
        console.log("loadNextPage", ...args);
        this.setState({ isNextPageLoading: true }, () => {
            setTimeout(() => {
                this.setState(state => ({
                    hasNextPage: state.items.length < 100,
                    isNextPageLoading: false,
                    items: [...state.items].concat(
                        new Array(30).fill(true).map(() => ({ name: faker.name.findName() }))
                    )
                }));
            }, 2500);
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