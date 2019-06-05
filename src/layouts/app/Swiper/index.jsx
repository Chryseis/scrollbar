/*
* Created by Allen on 2019-06-04
*/
import "swiper/dist/css/swiper.css"
import './index.less'
import React from 'react'
import Swiper from 'swiper/dist/js/swiper.min'
import Cover from '../images/cover.jpg'

class index extends React.Component {
  componentDidMount() {
    console.log(this.sildeRef.clientWidth)

    this.swiper = new Swiper(this.wrapRef)
  }

  render() {
    return <div className="swiper-container" ref={ref => this.wrapRef = ref}>
      <div className="swiper-wrapper">
        <div className="swiper-slide" ref={ref => this.sildeRef = ref}>
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="wrapper">
            <img src={Cover} alt=""/>
          </div>
        </div>
      </div>
    </div>
  }
}

export default index