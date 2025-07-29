import { useDispatch, useSelector, useStore } from 'react-redux';

// Use these throughout your app instead of plain useDispatch/useSelector
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
