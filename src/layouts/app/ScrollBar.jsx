import React, {Fragment} from 'react';
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ReactDOM from "react-dom";

class ScrollBar extends React.PureComponent {
  static defaultProps = {
    hasNextPage: false,
    isNextPageLoading: false,
    items: {},
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
    setTimeout(_ => Promise.resolve(1), 2000);

    new Promise(resolve => {
      setTimeout(_ => {
        console.log('load');
        resolve(1)
      }, 2000)
    }).then(_ => {
      this.setState({
        transition: true
      }, _ => {
        this.setState({
          y: 0,
          visibility: 'hidden'
        })
      })
    });
  };

  onTransitionEnd = _ => {
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
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
            <List
                className="List"
                height={document.documentElement.clientHeight}
                itemCount={1000}
                itemSize={50}
                onItemsRendered={onItemsRendered}
                ref={ref}
                outerRef={ref => this.scrollRef = ref}
                width={'100%'}
            >
              {Row}
            </List>
        )}
      </InfiniteLoader>
    </div>
  }
}

export default ScrollBar