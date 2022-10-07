import React, { useEffect, useContext } from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';

import { useStateContext } from './context/ContextProvider';
import './App.css';
import { BookingList, Home, List, Login, NewBooking, NewFacility, NewRoom, NewUser, Single } from './pages';
import { AuthContext } from "./context/AuthContext";
import AppWrap from './wrapper/AppWrapp';
import { bookingColumns, facilityColumns, roomColumns, userColumns } from './Data/datatablesource';

const App = () => {
    const { setCurrentColor, setCurrentMode } = useStateContext();
    const { user } = useContext(AuthContext);
    const location = useLocation();
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentThemeColor);
          setCurrentMode(currentThemeMode);
        }
      }, [setCurrentColor, setCurrentMode]);

    return (
        <Routes>
            <Route path="/">
                <Route path="login" element={<Login />} />
                <Route index element={
                    user ? (
                        <AppWrap>
                            <Home />
                        </AppWrap>
                    ): (<Navigate to='/login' />)
                } />
                <Route path='dashboard' element={
                    user ? (
                        <AppWrap>
                            <Home />
                        </AppWrap>
                    ): (<Navigate to='/login' />)
                } />
                <Route path="users">
                    <Route index element={
                        user ? (
                            <AppWrap>
                                <List columns={userColumns}/>
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path=":userId" element={
                        user ? (
                            <AppWrap>
                                <Single type='user' />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path="new" element={
                        user ? (
                            <AppWrap>
                                <NewUser />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                </Route>
                <Route path="facilities">
                    <Route index element={
                        user ? (
                            <AppWrap>
                                <List columns={facilityColumns}/>
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path=":id" element={
                        user ? (
                            <AppWrap>
                                <Single type='facility' />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path="new" element={
                        user ? (
                            <AppWrap>
                                <NewFacility />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                </Route>
                <Route path="rooms">
                    <Route index element={
                        user ? (
                            <AppWrap>
                                <List columns={roomColumns}/>
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path=":roomId" element={
                        user ? (
                            <AppWrap>
                                <Single type='room' />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path="new" element={
                        user ? (
                            <AppWrap>
                                <NewRoom />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                </Route>
                <Route path="bookings">
                    <Route index element={
                        user ? (
                            <AppWrap>
                                <BookingList columns={bookingColumns}/>
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path=":bookingId" element={
                        user ? (
                            <AppWrap>
                                <Single type='booking' />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                    <Route path="new" element={
                        user ? (
                            <AppWrap>
                                <NewBooking />
                            </AppWrap>
                        ): (<Navigate to='/login' />)
                    }/>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;