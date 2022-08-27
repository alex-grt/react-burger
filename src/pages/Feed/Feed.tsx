import feed from './Feed.module.css';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP
} from '../../services/actions/wsActions';
import Statistics from '../../components/Statistics/Statistics';
import OrderFeed from '../../components/OrderFeed/OrderFeed';

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_STOP })
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`${feed.feed}`}>
      <OrderFeed />
      <Statistics />
    </main>
  );
}

export default Feed;
