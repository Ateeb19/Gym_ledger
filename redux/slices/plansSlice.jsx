import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPlans, deletePlans, fetchPlans } from "../api/plansApi";

//Fetch the plans

export const getPlans = createAsyncThunk(
  "plans/list",

  async (__, thunkAPI) => {
    try {
      return await fetchPlans();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//Add the plan

export const addHandler = createAsyncThunk(
    "plans/add",
    async(payload, thunkAPI) => {
        try {
            return await addPlans(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

//Delete the Plan

export const deleteById = createAsyncThunk(
  "plans/delete",

  async (id, thunkAPI) => {
    try {
      await deletePlans(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// //Update the Plan

export const editHandler = createAsyncThunk(
  "plans/update",

  async ({id,payload}, thunkAPI) => {
    try {
      const response = await updatePlan(id,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const plansSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    allPlans: [],
    selectedPlan: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetMembers: (state) => {
      state.plans = state.allPlans;
    },
  },

  extraReducers: (builder) => {
    builder
      //Fetching plans
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload?.data;
        state.allPlans = action.payload?.data;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For add
      .addCase(addHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHandler.fulfilled, (state,action) => {
        state.loading = false;
        state.plans.unshift(action.payload);
      })
      .addCase(addHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For delete
      .addCase(deleteById.pending, (state) => {
              state.loading = true;
            })
            .addCase(deleteById.fulfilled, (state, action) => {
              state.loading = false;
              state.plans = state.plans.filter(
                (plan) => plan.p_id !== action.payload
              );
              state.allPlans = state.allPlans.filter(
                (plan) => plan.p_id !== action.payload
              );
            })
            .addCase(deleteById.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })


      //For update
      .addCase(editHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(editHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.map((item) => item.id === action.payload.id ? {...item, ...action.payload} : item);
      })
      .addCase(editHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



   

   

    
  },
});

export default plansSlice.reducer;
