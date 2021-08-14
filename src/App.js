
import React, { useState } from 'react';
import shortid from 'shortid';

function withNew(Component) {
    return function Wrapper(props) {
      return(
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            <Component {...props}/>
        </div>
      )
    }
};

function withPopular(Component) {
  return function Wrapper(props) {
    return (
      <div className="wrap-item wrap-item-popular">
          <span className="label">Popular!</span>
          <Component {...props}/>
      </div>
    )
  }
};

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};


function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};


const PopularArticle = withPopular(Article);
const PopularVideo = withPopular(Video);
const NewArticle = withNew(Article)
const NewVideo = withNew(Video)

const HighlightedArticle =  WithHighlight(Article)
const HighlightedVideo =  WithHighlight(Video)

function List(props) {
  return (
    props.list.map(item => {
      if (item.type === 'article') return (<HighlightedArticle {...item} key={shortid.generate()}/>) 
      else return (<HighlightedVideo {...item} key={shortid.generate()}/>)    
    })
  )
};

function WithHighlight(Component) {
  return function Wrapper(props) {
    const {views, type} = props;
   
    switch (true) {
      case (views > 1000):
        if (type === 'article') return <PopularArticle {...props}/>
        else return <PopularVideo {...props}/>
      case (views < 100):
        if (type === 'article') return <NewArticle {...props}/>
        else return <NewVideo {...props}/>
      default:
        return <Component {...props} />
    }
  }
}

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}