
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
Article.displayName = 'article'

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFSullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};
Video.displayName = 'video'



const HighlightedItem = WithHighlight(Article,Video);

function List(props) {
    return props.list.map(item => (HighlightedItem({...item})));
};

function WithHighlight(...Components) {
  return function Wrapper(props) {
    const id = shortid.generate()
    const {views, type} = props;
    const Component = Components.find((c) => c.displayName === type);
 
    switch (true) {
      case (views > 1000):
        const PopularItem = withPopular(Component)
        return <PopularItem {...props} key={id}/>
      case (views < 100):
        const NewItem = withNew(Component)
        return <NewItem {...props} key={id}/>
      default:
        return <Component {...props} key={id}/>;
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