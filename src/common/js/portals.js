import React from 'react'
import ReactDOM from 'react-dom'

const createPortals = (DecoratorsComponent) => {
    return class Portals extends React.Component {
        static defaultProps = {
            visible: false
        }

        createContainer() {
            if (!this.component) {
                this.dom = document.createElement('div')
                document.body.appendChild(this.dom)
            }
        }

        componentWillUnmount() {
            ReactDOM.unmountComponentAtNode(this.dom)
        }

        render() {
            const { visible } = this.props
            if (visible || this.component) {
                this.createContainer()
                return ReactDOM.createPortal(<DecoratorsComponent
                    ref={ref => this.component = ref} {...this.props}/>, this.dom)
            }
            return null
        }
    }
}

export default createPortals