import { creteSlice } from "@reduxjs/toolkit";

const initialState = {
    totalTask = 0,
    completedTask = 0,
    pendingTask = 0,
    overdueTask = 0,
    completionPercentage = 0,
}

const analyticSlice = createSlice({
    name: "analytics", 
    initalState,
    reducers: {
        updatedAnalytics: (state, action) => {
            const tasks = action.payload;
            const currentDate = new Date();
            currentDate.setHours(23,59,59,999)

            state.totalTask = tasks.length;
            state.completedTask = tasks.filter(task => task.completed).length;
            state.pendingTask = tasks.filter(task => !task.completed ).length;
            state.overdueTask = tasks.filter(task => {
                if (task.completed || !task.date) return false;
                const taskDate = new Date(task.date);
                return taskDate < currentDate;
            }).length;
            state.completionPercentage = state.totalTask === 0 ? 0 : Math.round((state.completedTask / state.totalTask) * 100);
        }
    }
})

export const { updatedAnalytics } = analyticSlice.actions;

export const selectAnalytics = (state) => state.analytics;

export default analyticSlice.reducer;