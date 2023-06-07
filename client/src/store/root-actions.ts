import * as authActions from './auth/auth.actions';
import errorActions from './message/message.slice';

export const rootActions = {
    ...authActions,
    ...errorActions
}