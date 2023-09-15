import { userLogin, userRegister } from "../redux/feautures/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("please fill all the fields");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    alert("please check the role");
  }
};

export const handleRegister = (
  e,
  email,
  password,
  role,
  name,
  organization,
  hospitalname,
  website,
  adress,
  phone
) => {
  e.preventDefault();
  try {
    if (!role || !email || !password || !adress || !phone) {
      return alert("please fill all the fields");
    }
    store.dispatch(
      userRegister({
        email,
        password,
        role,
        name,
        organization,
        hospitalname,
        website,
        adress,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
