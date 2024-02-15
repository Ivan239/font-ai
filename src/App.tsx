import { useState } from 'react';
import './App.css';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer from '@kepler.gl/reducers';
import { Provider, useDispatch } from 'react-redux';
import KeplerGl from '@kepler.gl/components';
import { addDataToMap } from '@kepler.gl/actions';
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

const id = getRandomInt(10000000000000);

const auth = btoa(
  `${'66e9f14f32b04a3daf9b15a5ac1046f8'}:${'13feda59-c00e-4506-a30f-2f9ef1d14689'}`,
);

const Map = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);
  const [lastValue, setLastValue] = useState<string>();

  const searchData = (): void => {
    const colIds = {
      first: getRandomInt(1000000000000000),
      second: getRandomInt(1000000000000000),
      third: getRandomInt(1000000000000000),
      fourth: getRandomInt(1000000000000000),
    };
    setLoading(true);
    const newValue = `{"id": ${rows?.length}, "turn": ${id}, \"geo_json\": \"${
      JSON.stringify(lastValue) || ''
    }\", \"user_message\": \"${value}\", \"assistant_message\": \"\"}`;
    axios
      .post(
        'https://core.malevich.ai/api/v1/endpoints/run/6c0b599715a130e956981d29d332fbe4a094edfeec510b7be4df1fe18004f147',
        {
          cfg: {
            rawCollections: {
              'Geohero Messages': [...rows, newValue],
            },
            appSettings: [
              {
                taskId: '90ddbc2e01b74bb194f4520f9086415d-compress_conversation-None',
                appId: '90ddbc2e01b74bb194f4520f9086415d-compress_conversation-None',
                saveCollectionsName: [`result-${colIds.first}`],
              },
              {
                taskId: 'beb9c53aeed34d4fba1bad26b96b990e-rename-None',
                appId: 'beb9c53aeed34d4fba1bad26b96b990e-rename-None',
                saveCollectionsName: [`result-${colIds.second}`],
              },
              {
                taskId: '779461314ed84cf59f556569f91bf844-expand-None',
                appId: '779461314ed84cf59f556569f91bf844-expand-None',
                saveCollectionsName: [`result-${colIds.third}`],
              },
              {
                taskId: '24823195d28d4b8baf4b1325d073803c-agent-None',
                appId: '24823195d28d4b8baf4b1325d073803c-agent-None',
                saveCollectionsName: [`result-${colIds.fourth}`],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: 'Basic ' + auth,
          },
        },
      )
      .then((res) => {
        axios
          .get(
            `https://core.malevich.ai/api/v1/collections/groupName/result-${colIds.fourth}?operationId=${res.data.operationId}`,
            {
              headers: {
                Authorization: 'Basic ' + auth,
              },
            },
          )
          .then((newData) => {
            setRows((prev) => [...prev, newValue]);
            const data = newData?.data?.data;
            const docs = data?.[data?.length - 1]?.docs;
            const json = docs?.[docs?.length - 1]?.data;
            const info = JSON.parse(json || '{}');
            const geo = JSON.parse(info?.geo_json || {});
            setLastValue(JSON.stringify(geo));
            dispatch(
              addDataToMap({
                datasets: {
                  info: {
                    label: value,
                    id: value,
                  },
                  // @ts-expect-error data correct
                  data: processGeojson(geo),
                },
              }),
            );
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
        alert('Try another request');
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

