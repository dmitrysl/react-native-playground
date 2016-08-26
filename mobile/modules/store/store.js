import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers'

// var middlewareWrapper = applyMiddleware(...);
// var createAppStore = middlewareWrapper(createStore(reducers))

export default function configureStore(onComplete: ?() => void) {
  const store = createStore(rootReducer, undefined, autoRehydrate());
  // persistStore(store, {storage: AsyncStorage}, onComplete);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    })
  }
  return store
}