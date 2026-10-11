import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Đề bài yêu cầu: "Toàn bộ component chỉ dùng useAppDispatch/useAppSelector đã gõ kiểu"
// Em bọc lại useDispatch và useSelector để ở các component dùng luôn, khỏi phải import type lằng nhằng

// Hook useDispatch có gõ kiểu AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook useSelector có sẵn kiểu dữ liệu RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
