import React from 'react';
import ReactDOM from "react-dom";
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSize from 'react-virtualized-auto-sizer';
import {Spring} from 'react-spring'

const PULL_HEIGHT = 150;
const CRITICAL_HEIGHT = 75;

class ScrollBar extends React.PureComponent {
  static defaultProps = {
    hasNextPage: false,
    isNextPageLoading: false,
    items: [],
    loadNextPage: () => {
    },
    initPage: () => {
    },
    itemSize: 50,
    style: {},
    className: null,
    rowItem: item => <div>{item.name}</div>,
    rowLoadingItem: () => <div>loading</div>
  };

  state = {
    y: 0,
    visibility: 'hidden',
    transition: false,
    present: 0
  };

  itemCount = () => {
    const { hasNextPage, items } = this.props;
    return hasNextPage ? items.length + 1 : items.length;
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
    const { items, rowItem, rowLoadingItem } = this.props;
    let content;
    if (!this.isItemLoaded(index)) {
      content = rowLoadingItem();
    } else {
      content = rowItem(items[index]);
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
      let y = deltaY > PULL_HEIGHT ? PULL_HEIGHT : deltaY;
      this.setState({
        y,
        visibility: 'visible',
        present: y / PULL_HEIGHT
      })
    }
  };

  onTouchEnd = e => {
    const { initPage } = this.props;
    let currY = e.changedTouches[0].pageY;
    let deltaY = currY - this.startY;
    let scrollWrap = ReactDOM.findDOMNode(this.scrollRef);
    if (scrollWrap.scrollTop === 0 && deltaY > 0) {
      if (deltaY > CRITICAL_HEIGHT) {
        this.setState({
          transition: true
        }, () => {
          this.setState({
            y: PULL_HEIGHT,
            present: 1
          }, () => initPage().then(() => {
            this.setState({
              transition: true,
              present: 0
            }, () => {
              this.setState({
                y: 0,
                visibility: 'hidden'
              })
            })
          }))
        });
      } else {
        this.setState({
          transition: true
        }, () => {
          this.setState({
            y: 0,
            present: 0
          })
        });
      }

    }
  };

  onTransitionEnd = () => {
    this.setState({ transition: false })
  };

  render() {
    const { itemSize, style, className } = this.props;
    const { y, visibility, transition, present } = this.state;
    return <div className={`scrollbar ${!!className ? className : ''}`.trim()} style={style}
                onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd} onTransitionEnd={this.onTransitionEnd}>
      <div className={`pull-wrap ${transition ? 'transition' : ''}`.trim()} style={{ height: y, visibility }}>
        <Spring to={{ opacity: present }}>{props => <div style={props}>loading</div>}</Spring>
      </div>
      <InfiniteLoader
          isItemLoaded={this.isItemLoaded}
          itemCount={this.itemCount()}
          loadMoreItems={this.loadMoreItems()}
      >
        {({ onItemsRendered, ref }) => (
            <AutoSize>
              {({ height, width }) => <List
                  className="List"
                  height={height}
                  itemCount={this.itemCount()}
                  itemSize={itemSize}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  outerRef={ref => this.scrollRef = ref}
                  width={width}
              >
                {this.Item}
              </List>}
            </AutoSize>
        )}
      </InfiniteLoader>
    </div>
  }
}

export default ScrollBar