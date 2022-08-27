import modal from '../components/Modal/Modal.module.css';
import { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import Modal from '../components/Modal/Modal';
import OrderInfo from '../components/OrderInfo/OrderInfo';

export function switchModal(path: string, callback: () => void): ReactNode {
  switch (path) {
    case '/feed': {
      return (
        <Route
          path="/feed/:id"
          children={
            <Modal
              isOpen={path}
              onClose={callback}
              styleName={modal.modal__cover_theme_orders}
            >
              <OrderInfo type="modal" />
            </Modal>
          }
        />
      );
    }
    case '/profile/orders': {
      return (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal
              isOpen={path}
              onClose={callback}
              styleName={modal.modal__cover_theme_orders}
            >
              <OrderInfo type="modal" />
            </Modal>
          }
        />
      );
    }
    case '/': {
      return (
        <Route
          path="/ingredients/:id"
          children={
            <Modal isOpen={path} onClose={callback}>
              <IngredientDetails />
            </Modal>
          }
        />
      );
    }
    default: { return null; }
  }
};
