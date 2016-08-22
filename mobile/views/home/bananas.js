import 
    React, 
    {
         Component
    } from 'react';
import { 
    Image,
    StyleSheet,
    Text,
    View,
    Animated,
    ActivityIndicator
} from 'react-native';

export class Bananas extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialStatus();
    }
  getInitialStatus() {
    return {
      error: false,
      loading: true,
      progress: 0,
      bounceValue: new Animated.Value(0)
    };
  }
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    let loader = !this.state.loading
      ? null
      : <ActivityIndicator
            style={[{transform: [{scale: 1.5}]}]}
            size="large"
        />;
    return (this.state.error && !this.state.loading
        ? <Text>{this.state.error}</Text>
        : 
        <View>
            <Image 
                source={pic} 
                style={{width: 193, height: 110}}
                onLoadStart={(g) => this.setState({loading: true})}
                onError={(g) => this.setState({error: g.nativeEvent.error, loading: false})}
                onLoad={() => this.setState({loading: false, error: false})}
                onProgress={(g) => this.setState({progress: 100 - g.nativeEvent.loaded / g.nativeEvent.total})}
            >
            </Image>
            {loader}
            {this.state.error || this.state.loading ? null : <Text style={[bananaStyles.grey, bananaStyles.main]}>Pic. 1 - Banana image</Text>}
            <View>
                <Animated.Image source={pic}
                    style={{transform: [{scale: this.state.bounceValue}]}}
                />
            </View>
        </View>
    );
  }
  componentDidMount() {
      this.state.bounceValue.setValue(1.5);
  }
}

const bananaStyles = StyleSheet.create({
    main: {
        textAlign: 'center',
        color: '#ccc',
        fontSize: 9,
        fontWeight: 'normal'
    },
    grey: {
        color: '#acacac'
    },
    progress: {
        color: '#2222dd'
    },
});