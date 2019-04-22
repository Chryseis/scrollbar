import React from 'react'
import './index.less'
import createPortals from '../../common/js/portals'

@createPortals
class Modal extends React.Component {
    render() {
        const { visible ,onClose} = this.props
        return <div className="wrap" style={{ display: visible ? 'block' : 'none' }}>
            <span>modal</span><span onClick={onClose}>close</span>
        </div>
    }
}

export default Modal