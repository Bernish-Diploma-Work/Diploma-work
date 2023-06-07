import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootActions } from '../store/root-actions';


export const useActions = () => {

    const dispatch = useDispatch();
    return bindActionCreators(rootActions, dispatch);
}

