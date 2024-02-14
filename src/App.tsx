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

const col = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: '81c9179a-ee34-4dad-8cdb-03856aa531de',
        version: 1103,
        score: 0.846038,
        hex: '8a195da4dacffff',
        lat: 51.522882855673998,
        lon: -0.11976919324492293,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.119594, 51.523522],
            [-0.120553, 51.523352],
            [-0.120728, 51.522712],
            [-0.119944, 51.522244],
            [-0.118986, 51.522414],
            [-0.118811, 51.523053],
            [-0.119594, 51.523522],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '157e6d72-0f1a-4389-a02e-b0c3c93e9324',
        version: 841,
        score: 0.8277689,
        hex: '8a195da4d367fff',
        lat: 51.522073369846936,
        lon: -0.12090269135754458,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.120728, 51.522712],
            [-0.121686, 51.522542],
            [-0.121861, 51.521903],
            [-0.121078, 51.521434],
            [-0.120119, 51.521605],
            [-0.119944, 51.522244],
            [-0.120728, 51.522712],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '4fc7e4f4-98ee-4955-80c2-f586331bd8d5',
        version: 45,
        score: 0.8166157,
        hex: '8a195da4d32ffff',
        lat: 51.523479450297764,
        lon: -0.12325340844512456,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.123078, 51.524119],
            [-0.124037, 51.523948],
            [-0.124212, 51.523309],
            [-0.123428, 51.52284],
            [-0.12247, 51.523011],
            [-0.122295, 51.52365],
            [-0.123078, 51.524119],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bdeacb32-5e47-4430-a413-4b5f6af9004e',
        version: 1660,
        score: 0.7987642,
        hex: '8a195da4d377fff',
        lat: 51.522371658981683,
        lon: -0.12264477501402084,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.12247, 51.523011],
            [-0.123428, 51.52284],
            [-0.123603, 51.522201],
            [-0.12282, 51.521733],
            [-0.121861, 51.521903],
            [-0.121686, 51.522542],
            [-0.12247, 51.523011],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '430db3a1-e5bc-4989-bb5c-5ffe93ca6c20',
        version: 955,
        score: 0.78445184,
        hex: '8a194ad32c4ffff',
        lat: 51.515340839199865,
        lon: -0.11089318576002176,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.110718, 51.51598],
            [-0.111676, 51.51581],
            [-0.111852, 51.51517],
            [-0.111068, 51.514702],
            [-0.11011, 51.514872],
            [-0.109935, 51.515511],
            [-0.110718, 51.51598],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '625a4473-af2c-4961-b467-2b4ff915a396',
        version: 1439,
        score: 0.7841352,
        hex: '8a195da4d30ffff',
        lat: 51.522669925986051,
        lon: -0.12438690293231178,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.124212, 51.523309],
            [-0.125171, 51.523139],
            [-0.125345, 51.522499],
            [-0.124562, 51.522031],
            [-0.123603, 51.522201],
            [-0.123428, 51.52284],
            [-0.124212, 51.523309],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'ca353b1b-f7b5-4c64-b4bf-1544d1f9e087',
        version: 1038,
        score: 0.78336453,
        hex: '8a195da4da8ffff',
        lat: 51.525396727612438,
        lon: -0.12272853379829105,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.122554, 51.526036],
            [-0.123512, 51.525865],
            [-0.123687, 51.525226],
            [-0.122903, 51.524758],
            [-0.121945, 51.524928],
            [-0.12177, 51.525567],
            [-0.122554, 51.526036],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '3714740e-27cf-4834-a761-f573781e6154',
        version: 799,
        score: 0.77933884,
        hex: '8a195da4d327fff',
        lat: 51.524587233331104,
        lon: -0.12386206866928544,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.123687, 51.525226],
            [-0.124646, 51.525056],
            [-0.124821, 51.524417],
            [-0.124037, 51.523948],
            [-0.123078, 51.524119],
            [-0.122903, 51.524758],
            [-0.123687, 51.525226],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '9bfcd8e5-2a35-48b6-bd35-aa61b33a5ea7',
        version: 289,
        score: 0.768193,
        hex: '8a195da4d307fff',
        lat: 51.523777714412923,
        lon: -0.12499558244025272,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.124821, 51.524417],
            [-0.125779, 51.524246],
            [-0.125954, 51.523607],
            [-0.125171, 51.523139],
            [-0.124212, 51.523309],
            [-0.124037, 51.523948],
            [-0.124821, 51.524417],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: '70af22ea-b2ff-47b6-9319-0b9b7d3afd6a',
        version: 596,
        score: 0.7633711,
        hex: '8a195da4d357fff',
        lat: 51.521562129276589,
        lon: -0.12377825021777772,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.123603, 51.522201],
            [-0.124562, 51.522031],
            [-0.124737, 51.521392],
            [-0.123953, 51.520923],
            [-0.122995, 51.521093],
            [-0.12282, 51.521733],
            [-0.123603, 51.522201],
          ],
        ],
      },
    },
  ],
};

const Map = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);
  const [lastValue, setLastValue] = useState();

  const searchData = (): void => {
    setLoading(true);
    /*const newValue = `{"id": ${rows?.length}, "turn": ${id}, \"geo_json\": \"${
      JSON.stringify(lastValue) || ''
    }\", \"user_message\": \"${value}\", \"assistant_message\": \"\"}`;
    axios
      .post(
        'https://core.malevich.ai/api/v1/endpoints/run/ee4f3b5757c8b7cf0019182c77a23ff07e90c4f465a6ba1260d7f0387d6e82c3',
        {
          cfg: {
            rawCollections: {
              'Geohero Messages': [...rows, newValue],
            },
          },
          appSettings: [
            {
              taskId: 'a948746d2072463ca6313b0d8af611ed-mock_agent-geohero #3',
              appId: 'a948746d2072463ca6313b0d8af611ed-mock_agent-geohero #3',
              saveCollectionsName: 'result-collection',
            },
          ],
        },
        {
          headers: {
            Authorization: 'Basic ' + auth,
          },
        },
      )
      .then((res) => {
        console.log(res);
        axios
          .post(
            `https://core.malevich.ai/api/v1/collections/groupName/result-collection?operationId=${res.operationId}`,
          )
          .then((newData) => {
            /*setRows((prev) => [...prev, newValue]);
        // @ts-expect-error no error?
        setLastValue(res);
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
        setLoading(false); */
    /*});
      })
      .catch(() => {
        // setLoading(false);
      });*/
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: value,
            id: value,
          },
          // @ts-expect-error data correct
          data: processGeojson(col),
        },
      }),
    );
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

