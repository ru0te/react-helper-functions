import { useReducer } from 'react';
import { useEffect } from 'react';

const ACTIONS = {
  FETCH_START: 'FETCH START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH_START:
      return { ...state, data: undefined, isError: false, isLoading: true };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}

export function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    isError: false,
    isLoading: true,
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_START });
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
      } catch (err) {
        if (err.name === 'AbortError') return;
        dispatch({ type: ACTIONS.FETCH_ERROR });
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return state;
}
