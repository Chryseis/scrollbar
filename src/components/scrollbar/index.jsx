import './index.less'
import React, {Fragment} from 'react'
import BScroll from 'better-scroll'

class index extends React.Component {
    static defaultProps = {
        tagName: 'ul',
        prefixCls: '',
        scrollPrefixCls: ''
    }

    state = {
        listHeight: 0,
        height: 0,
        pullUpLoad: false,
        pullDownRefresh: false
    }

    componentDidMount() {

        const { pullUpLoad, pullDownRefresh } = this.state

        this.scroll = new BScroll(this.wrapRef, {
            pullDownRefresh: pullDownRefresh,
            pullUpLoad: pullUpLoad,
            scrollbar: {
                fade: true
            }
        })
    }

    render() {
        const { tagName, prefixCls, scrollPrefixCls } = this.props
        const { listHeight } = this.state
        return <div className="scrollbar">
            <div className={`scroll-wrap ${prefixCls ? prefixCls : ''}`} ref={ref => this.wrapRef = ref}>
                <div ref={ref => this.scrollRef = ref}>
                    {
                        React.createElement(tagName, { className: scrollPrefixCls ? scrollPrefixCls : '' }, this.props.children)
                    }
                </div>
                <div className="pull-up-loadmore">
                    loading
                </div>
            </div>
            <div className="pull-down-refresh">
                loading
            </div>
        </div>
    }
}

export default index