import './app.less'
import React from 'react'
import faker from 'faker'
import map from 'lodash/map'
import ScrollBar from '@/components/scrollbar'

class BScroll extends React.Component {
    state = {
        data: new Array(20).fill(1).map(_ => ({ name: faker.name.findName() }))
    }

    refreshDataSource = () => {
        return new Promise(resolve => {
            setTimeout(_ => {
                this.setState({
                    data: new Array(20).fill(1).map(_ => ({ name: faker.name.findName() }))
                })
                resolve()
            }, 2000)
        })
    }

    loadMoreDataSource = () => {
        return new Promise(resolve => {
            setTimeout(_ => {
                this.setState({
                    data: this.state.data.concat(new Array(20).fill(1).map(_ => ({ name: faker.name.findName() })))
                })
                resolve()
            }, 2000)
        })
    }


    render() {
        const { data } = this.state
        return <div className="test"><ScrollBar refresh={this.refreshDataSource} loadMore={this.loadMoreDataSource} pullDownRefresh={true}
                               pullUpLoad={true}>
            {map(data, (o, i) => <li className="name" key={i}>
                {o.name}
            </li>)}
        </ScrollBar></div>
    }
}

export default BScroll