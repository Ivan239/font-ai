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
import axios from 'axios';

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

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const id = getRandomInt(10000000000);

const auth = btoa(
  `${'66e9f14f32b04a3daf9b15a5ac1046f8'}:${'13feda59-c00e-4506-a30f-2f9ef1d14689'}`,
);

const Map = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);

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
    setLoading(true);
    axios
      .post(
        'https://core.malevich.ai/api/v1/endpoints/run/ee4f3b5757c8b7cf0019182c77a23ff07e90c4f465a6ba1260d7f0387d6e82c3',
        {
          cfg: {
            rawCollections: {
              df: [
                ...rows,
                `{"id": ${rows?.length}, "turn": ${id}, "geo_json": "", "user_message": "${value}"}`,
              ],
            },
          },
        },
        {
          headers: {
            Authorization: 'Basic ' + auth,
          },
        },
      )
      .then((res) => {
        setRows((prev) => [
          ...prev,
          `{"id": ${rows?.length}, "turn": ${id}, "geo_json": "", "user_message": ${value}}`,
        ]);
        console.log(res);
        dispatch(
          addDataToMap({
            datasets: {
              info: {
                label: value,
                id: value,
              },
              // @ts-expect-error data correct
              data: processGeojson(res),
            },
          }),
        );
        setLoading(false);
      })
      .catch(() => {
        // setLoading(false);
      });
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

