/**
 * Created by Administrator on 2019/4/23.
 */

import React from 'react'
import Modal from '../../components/modal2'

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render() {
        const { visible } = this.state
        return <div>
            <span onClick={_ => this.setState({ visible: true })}>click</span>
            <Modal visible={visible} onClose={_ => this.setState({ visible: false })}/>
        </div>
    }
}

export default Test