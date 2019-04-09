/**
 * Created by Administrator on 2017/12/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import  {Transition} from 'react-transition-group';
import './message.less';


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.close = this.close.bind(this);
    }

    static propsType = {
        title: PropTypes.string,
        content: PropTypes.string,
        btnText: PropTypes.string
    }

    static defaultProps = {
        title: '温馨提示',
        content: '请使用浏览器自带的分享功能，分享给您的好友',
        btnText: '确定'
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    close = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const {title, content, btnText} = this.props;
        const {visible} = this.state;
        return <Transition in={visible} timeout={500} appear unmountOnExit  onEnter={_ => ModalHelper.afterOpen()}  onExit={_ => ModalHelper.beforeClose()}>
            {
                status => <div className={`message-mask ${status}`}>
                    <div className="message-wrapper">
                        <div className="header">{title}</div>
                        <div className="body">{content}</div>
                        <div className="footer" onClick={this.close}>{btnText}</div>
                    </div>
                </div>
            }
        </Transition>
    }
}

Message.newInstance = function (props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    const message = ReactDOM.render(<Message {...props}/>, div);
    return {
        show(){
            message.show();
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}
export default Message;