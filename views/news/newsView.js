import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native';

let moment = require('moment');

let TOTAL_NEWS_ITEMS = 10;

export class NewsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            news: {},
            loaded: false
        };
        this._scrollView = null;
    }

    componentDidMount() {
        AsyncStorage.getItem('newsItems')
          .then((response) => JSON.parse(response))
          .then((items) => {
              if (!items) {
                this.getNews();
                return;
              }

              AsyncStorage.getItem('lastTime')
                .then((response) => JSON.parse(response))
                .then((time) => {
                  let lastTime = time.lastCache;
                  let currentTime = moment();
                  let diffDays = currentTime.diff(lastTime, 'days');
                  if (diffDays > 0) {
                        this.getNews();
                  } else {
                      this.updateNewsItemsUI(items);
                  }
                });
          })
          .done();
    }

    renderNews(news, scope) {
      console.log("PROPS --------", scope.props)
      return (
        <TouchableHighlight onPress={() => scope.props.newsDetailsAction.call(this, news.url)} underlayColor={"#E8E8E8"} style={styles.button}>
          <View style={styles.news_item}>
            <Text style={styles.news_item_text}>{news.title}</Text>
          </View>
        </TouchableHighlight>
      );
    }

    updateNewsItemsUI(newsItems) {
      if (newsItems.length != TOTAL_NEWS_ITEMS) return;
      let ds = this.state.dataSource.cloneWithRows(newsItems);
      this.setState({
        "news": ds,
        "loaded": true
      })
    }

    updateNewsItemDB(newsItems) {
      if (newsItems.length != TOTAL_NEWS_ITEMS) return;
      AsyncStorage.setItem("newsItems", JSON.stringify(newsItems));
    }

    getNews() {
      let newsUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
      let newsItems = [];
      AsyncStorage.setItem('lastTime', JSON.stringify({'lastTime': moment()}));
      fetch(newsUrl, {
            method: 'GET'
            // headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            // firstParam: 'yourValue',
            // secondParam: 'yourOtherValue',
            // })
        })
        .then((response) => response.json())
        .then((items) => {
          for (let i = 0; i < 10; i++) {
            let newsItemUrl = "https://hacker-news.firebaseio.com/v0/item/" + items[i] + ".json";
            fetch(newsItemUrl, {
                method: 'GET'
                // headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({
                // firstParam: 'yourValue',
                // secondParam: 'yourOtherValue',
                // })
            })
            .then((response) => response.json())
            .then((newsItem) => {
              newsItems.push(newsItem);
              this.updateNewsItemsUI(newsItems);
              this.updateNewsItemDB(newsItems);
            })
          }
        })
    }

    scrollToTop() {
      if (!this._scrollView) return;
      this._scrollView.scrollTo({x: 0});
    }

    render() {
      let self = this;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hello From News</Text>
                <ScrollView 
                  ref={(scrollView) => { this._scrollView = scrollView; }}
                  automaticallyAdjustContentInsets={true} 
                  horizontal={false}
                  onScroll={() => { console.log('onScroll!'); }}
                  scrollEventThrottle={200}
                  style={{flex: 1, borderColor: 'red', borderRadius: 5}}>
                {
                    this.state.loaded && 
                    <ListView 
                      initialListSize={1}
                      dataSource={this.state.news}
                      style={styles.news}
                      renderRow={(rowData) => this.renderNews.call(this, rowData, self)}></ListView>
                }
                </ScrollView>
                <Button onPress={this.scrollToTop} title='Scroll to start' />
                <Button onPress={this.props.onPress} title='Go To Chat' />
                <Button onPress={this.props.goBack} title='Go Back' />
            </View>
        );
    }
}

const Button = ({title, onPress}) => (
  <TouchableHighlight 
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginTop: 200,
    textAlign: 'center'
  },
   button: {
    height: 70,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  },
  news: {
    padding: 5
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  news_item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5
  },
  news_item_text: {
    color: '#575757',
    fontSize: 18
  },
});