import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CrwnLogo } from "../../asset/crown.svg";

// import { signOutUser } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";
import { CartContext } from "../../context/cart.context";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentUser);
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutUser = () => dispatch(signOutStart());
  // const signOutHandler = async () =>{
  //   const res = await signOutUser();
  //   setCurrentUser(res);
  // }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
