import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <Route
      render={({ location }) =>
        refreshToken ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default ProtectedRoute;
