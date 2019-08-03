import { applyMiddleware, createStore, Reducer, Store } from 'redux';
// import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PersistConfig, Persistor } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import rootReducer, { ReducersList, ReducresActions } from '@/store/Redux/Reducers/index';

export const windowExist = process.browser && typeof window !== undefined;

const getReducers = (): Reducer<ReducersList, ReducresActions> => {
  if (!windowExist) {
    return rootReducer;
  } else {
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig: PersistConfig = {
      key: 'root',
      storage,
      blacklist: ['v_animate', 'searchNavMobile', 'searchFilter']
    };

    return persistReducer(persistConfig, rootReducer);
  }
};

export const store: Store<ReducersList, ReducresActions> = createStore(
  getReducers(),
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store);
