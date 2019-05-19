import './index.less'
import React from 'react'
import BScroll from 'better-scroll'

const initTop = -50
const defaultPullDownRefresh = {
    threshold: 50,
    stop: 50
}
const defaultPullUpLoad = {
    threshold: 0,
    txt: {
        more: '加载中',
        nomore: '没有更多了',
    },
}

class ScrollBar extends React.Component {
    static defaultProps = {
        tagName: 'ul',
        prefixCls: '',
        scrollPrefixCls: '',
        refresh: () => {
        },
        loadMore: () => {
        }
    }

    isRebounding = false

    state = {
        isPullingDown: false,
        isPullUpLoad: false,
        pullDownTop: initTop,
        beforePullDown: true,
    }

    componentDidMount() {
        this.initScroll()
    }

    componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
            if (!this.state.isPullingDown) {
                this.scroll.refresh()
            }
        }
    }

    componentWillUnmount() {
        this.scroll.stop()
        this.scroll.destroy()
        this.scroll = null
        clearTimeout(this.timerRebound)
        clearTimeout(this.timerAfter)
    }

    initScroll = () => {
        const { pullDownRefresh, pullUpLoad } = this.props

        let _pullDownRefresh = typeof pullDownRefresh === 'object' ? {
            ...defaultPullDownRefresh,
            ...pullDownRefresh
        } : (pullDownRefresh ? defaultPullDownRefresh : false)

        let _pullUpLoad = typeof pullUpLoad === 'object' ? {
            ...defaultPullUpLoad,
            ...pullUpLoad
        } : (pullUpLoad ? defaultPullUpLoad : false)

        this.scroll = new BScroll(this.wrapRef, {
            pullDownRefresh: _pullDownRefresh,
            pullUpLoad: _pullUpLoad,
            scrollbar: {
                fade: false
            }
        })

        this.initPullLoadRefresh()
        this.initPullUpLoad()
    }

    initPullUpLoad = () => {
        const { loadMore } = this.props
        this.scroll.on('pullingUp', () => {
            this.setState({
                isPullUpLoad: true
            })

            loadMore().then(() => {
                this.setState({
                    isPullUpLoad: false,
                })
                this.scroll.finishPullUp()
                this.scroll.refresh()
            })
        })
    }

    initPullLoadRefresh = () => {
        const { refresh, pullDownRefresh } = this.props
        const { beforePullDown, pullDownTop } = this.state

        let _pullDownRefresh = typeof pullDownRefresh === 'object' ? {
            ...defaultPullDownRefresh,
            ...pullDownRefresh
        } : (pullDownRefresh ? defaultPullDownRefresh : false)

        this.scroll.on('pullingDown', () => {
            this.setState({
                beforePullDown: false,
                isPullingDown: true
            })

            refresh().then(_ => {
                this.setState({
                    isPullingDown: false
                })
                this.reboundPullDown().then(_ => {
                    this.afterPullDown()
                })
            })
        })

        this.scroll.on('scroll', ({ y }) => {
            if (y < 0) {
                return
            }

            if (beforePullDown) {
                this.setState({
                    pullDownTop: Math.min(y + pullDownTop, 10)
                })
            }

            if (this.isRebounding) {
                this.setState({
                    pullDownTop: 10 - (_pullDownRefresh.stop - y)
                })
            }
        })
    }

    reboundPullDown = () => {
        const { pullDownRefresh: { stopTime = 600 } } = this.props
        return new Promise(resolve => {
            this.timerRebound = setTimeout(_ => {
                this.isRebounding = true
                this.scroll.finishPullDown()
                resolve()
            }, stopTime)
        })
    }

    afterPullDown = () => {
        this.timerAfter = setTimeout(() => {
            this.setState({
                pullDownTop: initTop,
                beforePullDown: true
            })
            this.isRebounding = false
            this.scroll.refresh()
        }, this.scroll.options.bounceTime)
    }

    render() {
        const { tagName, prefixCls, scrollPrefixCls, style } = this.props
        const { pullDownTop, isPullUpLoad } = this.state
        return <div className="scrollbar" ref={ref => this.wrapRef = ref} style={style}>
            <div className={`scroll-wrap ${prefixCls ? prefixCls : ''}`}>
                <div ref={ref => this.scrollRef = ref}>
                    {
                        React.createElement(tagName, { className: scrollPrefixCls ? scrollPrefixCls : '' }, this.props.children)
                    }
                </div>
                <div className="pull-up-load">
                    {isPullUpLoad ? 'loading' : 'no more'}
                </div>
            </div>
            <div className="pull-down-refresh" style={{ top: pullDownTop }}>
                loading
            </div>
        </div>
    }
}

export default ScrollBar