
'use client';

import { Provider } from 'react-redux';
import { store } from '@/src/app/lib/store/store'
// import { makeStore, AppStore } from '@/src/app/lib/store/store'

export default function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
