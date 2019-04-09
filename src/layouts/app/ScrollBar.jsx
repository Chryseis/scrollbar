import React, {Fragment} from 'react';
import ReactDOM from "react-dom";
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

// import AutoSize from 'react-virtualized-auto-sizer';

class ScrollBar extends React.PureComponent {
    static defaultProps = {
        hasNextPage: false,
        isNextPageLoading: false,
        items: [],
        loadNextPage: () => {
        },
        initPage: () => {
        }
    };

    state = {
        y: 0,
        visibility: 'hidden',
        transition: false
    };

    itemCount = () => {
        const { hasNextPage, items } = this.props;
        return hasNextPage ? items.length + 1 : items;
    };

    loadMoreItems = () => {
        const { isNextPageLoading, loadNextPage } = this.props;
        return isNextPageLoading ? () => {
        } : loadNextPage;
    };

    isItemLoaded = index => {
        const { hasNextPage, items } = this.props;
        return !hasNextPage || index < items.length;
    };

    Item = ({ index, style }) => {
        const { items } = this.props;
        let content;
        if (!this.isItemLoaded(index)) {
            content = "Loading...";
        } else {
            content = items[index].name;
        }

        return <div style={style}>{content}</div>;
    };

    onTouchStart = e => {
        this.startY = e.touches[0].pageY;
    };

    onTouchMove = e => {
        let currY = e.touches[0].pageY;
        let deltaY = currY - this.startY;
        let scrollWrap = ReactDOM.findDOMNode(this.scrollRef);
        if (scrollWrap.scrollTop === 0 && deltaY > 0) {
            this.setState({
                y: deltaY > 100 ? 100 : deltaY,
                visibility: 'visible'
            })
        }
    };

    onTouchEnd = e => {
        const { initPage } = this.props;
        let currY = e.changedTouches[0].pageY;
        let deltaY = currY - this.startY;
        let scrollWrap = ReactDOM.findDOMNode(this.scrollRef);
        if (scrollWrap.scrollTop === 0 && deltaY > 0) {
            initPage().then(() => {
                this.setState({
                    transition: true
                }, () => {
                    this.setState({
                        y: 0,
                        visibility: 'hidden'
                    })
                })
            });
        }
    };

    onTransitionEnd = () => {
        this.setState({ transition: false })
    };

    render() {
        const { y, visibility, transition } = this.state;
        return <div className="scrollbar" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd} onTransitionEnd={this.onTransitionEnd}>
            <div className={`pull-wrap ${transition ? 'transition' : ''}`.trim()} style={{ height: y, visibility }}>
                <div className="icon"/>
            </div>
            <InfiniteLoader
                isItemLoaded={this.isItemLoaded}
                itemCount={this.itemCount()}
                loadMoreItems={this.loadMoreItems()}
            >
                {({ onItemsRendered, ref }) => (
                    <List
                        className="List"
                        height={document.documentElement.clientHeight}
                        itemCount={this.itemCount()}
                        itemSize={50}
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                        outerRef={ref => this.scrollRef = ref}
                        width={'100%'}
                    >
                        {this.Item}
                    </List>
                )}
            </InfiniteLoader>
        </div>
    }
}

export default ScrollBar