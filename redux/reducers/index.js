import { combineReducers } from "redux";
import { user } from './user';
import { users } from './users';

const Reducers = combineReducers({
    userState : user,
    userState : users
})

export default Reducers;