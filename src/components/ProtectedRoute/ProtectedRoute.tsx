import { FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface IProtectedRouteProps {
  path: string;
  exact: boolean;
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...props }) => {
  const { loggedIn } = useAppSelector(store => store.loggedIn);
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <Route
      {...props}
      render={({ location }) =>
        loggedIn || refreshToken ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
