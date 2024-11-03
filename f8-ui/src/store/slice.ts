/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { create } from 'domain';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

// Show VerticalModal slice
export interface ShowVerticalModal {
    info: string;
    status: boolean;
}

const initialShowVerticalModal: ShowVerticalModal[] = [];

export const showVerticalModalSlice = createSlice({
    name: 'showVerticalModal',
    initialState: initialShowVerticalModal,
    reducers: {
        updateShowVerticalModalValue: (state, action: PayloadAction<ShowVerticalModal>) => {
            const { info, status } = action.payload;
            const existingItemIndex = state.findIndex((item) => item.info === info);
            if (existingItemIndex !== -1) {
                // Nếu item đã tồn tại, cập nhật trạng thái của nó
                state[existingItemIndex].status = status;
            } else {
                // Nếu item chưa tồn tại, thêm mới vào store
                state.push(action.payload);
            }
        },
    },
});

export const { updateShowVerticalModalValue } = showVerticalModalSlice.actions;
export const showVerticalModalReducer = showVerticalModalSlice.reducer;
