import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTime, selectTime } from './timerSlice';
import './timer.css';

export function Timer(props) {
    const currentTime = useSelector(selectTime);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(setTime())
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div className="timer"><span>🕒</span> {currentTime}</div>
}
