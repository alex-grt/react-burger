import feed from './Feed.module.css';
import { FC } from 'react';
import Statistics from '../../components/Statistics/Statistics';
import OrderFeed from '../../components/OrderFeed/OrderFeed';

const Feed: FC = () => {
  return (
    <main className={`${feed.feed}`}>
      <OrderFeed />
      <Statistics />
    </main>
  );
}

export default Feed;
