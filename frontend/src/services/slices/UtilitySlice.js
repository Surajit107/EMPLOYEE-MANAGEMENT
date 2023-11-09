import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ADD_DEPARTMENT, ALL_DEPARTMENT, ALL_EMPLOYEE, DELETE_DEPARTMENT, FILTER_LOCATION, FILTER_NAME, UPDATE_DEPARTMENT, UPDATE_USER_DEPARTMENT } from "../api/Api";


//AsyncThunk For Add department 
export const addDepartment = createAsyncThunk("/add/department", async ({ data, header }, { rejectWithValue, dispatch }) => {
    try {
        const result = await ADD_DEPARTMENT(data, header);
        // console.log(result);
        // return;
        if (result?.data?.success) {
            // react toast message
            toast.success(result?.data?.message, {
                autoClose: 3000
            });
            dispatch(allDepartment());
        } else {
            // react toast message
            toast.error(result?.data?.message, {
                autoClose: 3000
            });
        }
        return result?.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For All department 
export const allDepartment = createAsyncThunk("/all/department", async (payload, { rejectWithValue }) => {
    try {
        const result = await ALL_DEPARTMENT();
        return result?.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For update department 
export const updateDepartment = createAsyncThunk("/update/department", async ({ id, data, header }, { rejectWithValue, dispatch }) => {
    try {
        const result = await UPDATE_DEPARTMENT(id, data, header);
        // console.log(result);
        // return;
        if (result?.data?.success) {
            // react toast message
            toast.success(result?.data?.message, {
                autoClose: 3000
            });
            dispatch(allDepartment());
        } else {
            // react toast message
            toast.error(result?.data?.message, {
                autoClose: 3000
            });
        }
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For delete department 
export const deleteDepartment = createAsyncThunk("/delete/department/", async ({ id, header }, { rejectWithValue, dispatch }) => {
    try {
        const result = await DELETE_DEPARTMENT(id, header);
        if (result?.data?.success) {
            // react toast message
            toast.success(result?.data?.message, {
                autoClose: 3000
            });
            dispatch(allDepartment());
        } else {
            // react toast message
            toast.error(result?.data?.message, {
                autoClose: 3000
            });
        }
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For All employee
export const allEmployee = createAsyncThunk("/all/employee", async (payload, { rejectWithValue }) => {
    try {
        const result = await ALL_EMPLOYEE();
        window.localStorage.setItem("all_employee_data", JSON.stringify(result?.data?.data));
        return result?.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For update user department 
export const updateUserDepartment = createAsyncThunk("/update/user/department", async ({ id, data, header }, { rejectWithValue, dispatch }) => {
    try {
        const result = await UPDATE_USER_DEPARTMENT(id, data, header);
        // console.log(result);
        // return;
        if (result?.data?.success) {
            // react toast message
            toast.success(result?.data?.message, {
                autoClose: 3000
            });
            dispatch(allEmployee());
        } else {
            // react toast message
            toast.error(result?.data?.message, {
                autoClose: 3000
            });
        }
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For filter name 
export const filterName = createAsyncThunk("/filter/name/", async ({ type, header }, { rejectWithValue }) => {
    try {
        const result = await FILTER_NAME(type, header);
        return result?.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});


//AsyncThunk For filter location 
export const filterLocation = createAsyncThunk("/filter/location/", async ({ type, header }, { rejectWithValue }) => {
    try {
        const result = await FILTER_LOCATION(type, header);
        return result?.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }

});





// Creating Slice
const UtilitySlice = createSlice({
    name: "utilitySlice",
    initialState: {
        department_data: [],
        employee_data: [],
        status: null,
        error: null,
        loading: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        //States for Add Department
        builder.addCase(addDepartment.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(addDepartment.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.data = payload;
        })
        builder.addCase(addDepartment.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload?.message;
        })

        //States for All Department
        builder.addCase(allDepartment.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(allDepartment.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.department_data = payload?.data;
        })
        builder.addCase(allDepartment.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload?.message;
        })

        //States for All Employee
        builder.addCase(allEmployee.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(allEmployee.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.employee_data = payload?.data;
        })
        builder.addCase(allEmployee.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
            state.error = payload?.message;
        })

        //States for Name Filter
        builder.addCase(filterName.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(filterName.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.employee_data = payload?.data;
        })
        builder.addCase(filterName.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
        })

        //States for Name Filter
        builder.addCase(filterLocation.pending, (state, { payload }) => {
            state.status = "Loading...";
            state.loading = true;
        })
        builder.addCase(filterLocation.fulfilled, (state, { payload }) => {
            state.status = "Success";
            state.loading = false;
            state.employee_data = payload?.data;
        })
        builder.addCase(filterLocation.rejected, (state, { payload }) => {
            state.status = "Failed";
            state.loading = false;
        })
    }
})

export const { clearError } = UtilitySlice.actions;
export default UtilitySlice.reducer;