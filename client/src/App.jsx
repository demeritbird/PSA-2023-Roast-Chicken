import { Fragment, useEffect, useReducer } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard/DashboardLayout';
import ChangesLayout from './layouts/Changes/ChangesLayout';

function App() {
  const navigate = useNavigate();

  const initialRouteState = {
    dashboard: true,
    changes: false,
  };
  const [routeState, routeDispatch] = useReducer(routeReducer, initialRouteState);
  function routeReducer(_, action) {
    let newRouteState;
    switch (action.type) {
      case 'dashboard':
        newRouteState = { dashboard: true, changes: false };
        break;
      case 'changes':
        newRouteState = { dashboard: false, changes: true };
        break;
      default:
        throw new Error();
    }
    return newRouteState;
  }
  useEffect(() => {
    if (routeState.dashboard) {
      navigate('/');
    } else if (routeState.changes) {
      navigate('/changes');
    }
  }, [routeState.dashboard, routeState.changes, navigate]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Fragment>
      <div className={styles.background}>
        <div className={styles.bound}>
          <aside className={styles.sidebar}>
            <div className={styles['sidebar__image-overlay']}>
              <div className={styles.sidebar__title}>
                <div className={styles['sidebar__title-icon']}></div>
                <h4 className={styles['sidebar__title-text']}>Roast Chicken</h4>
              </div>

              <div className={styles.sidebar__body}>
                <div
                  className={`${styles['sidebar__route']} 
                              ${
                                routeState.dashboard
                                  ? `${styles['sidebar__route--active']}`
                                  : ''
                              }`}
                  onClick={() =>
                    routeDispatch({
                      type: 'dashboard',
                    })
                  }
                >
                  <div className={`${styles['sidebar__route-icon']}`}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6'
                    >
                      <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                      <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
                    </svg>
                  </div>
                  <h4 className={`${styles['sidebar__route-text']}`}>Dashboard</h4>
                </div>
                <div
                  className={`${styles['sidebar__route']} 
                            ${
                              routeState.changes ? `${styles['sidebar__route--active']}` : ''
                            }`}
                  onClick={() =>
                    routeDispatch({
                      type: 'changes',
                    })
                  }
                >
                  <div className={`${styles['sidebar__route-icon']}`}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <h4 className={`${styles['sidebar__route-text']}`}>Changes</h4>
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.container}>
            <header className={styles.container__header}>
              <h1 className={styles['container__header-greeting']}>
                Hello,{' '}
                <span className={styles['container__header-greeting--highlight']}>
                  demeritbird
                </span>
              </h1>
              <h4 className={styles['container__header-changes']}>
                <span className={styles['container__header-changes--highlight']}>
                  5 changes
                </span>{' '}
                to be made
              </h4>
            </header>
            <main className={styles.container__main}>
              <Routes>
                <Route path='/' element={<DashboardLayout />} />
                <Route path='/changes' element={<ChangesLayout />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
