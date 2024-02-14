import { useEffect, useState } from 'react';
import './App.css';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from '@kepler.gl/reducers';
import { Provider, useDispatch } from 'react-redux';
import KeplerGl from '@kepler.gl/components';
import { addDataToMap } from '@kepler.gl/actions';
import * as schema from './schema.json';
import { processGeojson } from '@kepler.gl/processors';
import { enhanceReduxMiddleware } from '@kepler.gl/reducers/dist';
import searchIcon from './searchIcon.svg';
import spinner from './spinner.svg';

const initialState = {};
const middlewares = enhanceReduxMiddleware([
  // Add other middlewares here
]);
const reducers = combineReducers({
  // <-- mount kepler.gl reducer in your app
  keplerGl: keplerGlReducer,
});
const enhancers = [applyMiddleware(...middlewares)];

// @ts-expect-error okay
const store = createStore(reducers, initialState, compose(...enhancers));

function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

export default App;

const Map = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data',
          },
          // @ts-expect-error data correct
          data: processGeojson(schema),
        },
      }),
    );
  }, []);

  const searchData = (): void => {
    setLoading(!loading);
  };

  return (
    <div className="app">
      <KeplerGl
        id="covid"
        mapboxApiAccessToken="pk.eyJ1IjoiemFraGFyZGF2eWRvdiIsImEiOiJjbHNscXB4ZHQwZHVpMmxud3Z2eWg0Z2cyIn0.kCqscFCRh-yNkewbHlxv6A"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div className="input_wrap">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input"
          placeholder="Where do you want to fly..."
          onKeyDown={(e) => e.key === 'Enter' && value.length && searchData()}
        />
        {value?.length ? (
          <div className="icon_wrap" onClick={() => searchData()}>
            {!loading ? <img src={searchIcon} alt="search" /> : <img src={spinner} alt="spinner" />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

