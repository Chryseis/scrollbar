import './app.less'
import React, {Fragment} from 'react'
import faker from 'faker'
import map from 'lodash/map'
import ScrollBar from '@/components/scrollbar'

class BScroll extends React.Component {
    state = {
        data: new Array(50).fill(1).map(_ => ({ name: faker.name.findName() }))
    }


    render() {
        const { data } = this.state
        return <ScrollBar>
            {map(data, (o, i) => <li className="name" key={i}>
                {o.name}
            </li>)}
        </ScrollBar>
    }
}

export default BScroll