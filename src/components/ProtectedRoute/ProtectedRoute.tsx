import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TStore } from '../../utils/types';

interface IProtectedRouteProps {
  path: string;
  exact: boolean;
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { loggedIn }: { loggedIn: boolean } = useSelector(
    (store: TStore) => store.loggedIn
  );

  return (
    <Route
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
