import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPlans, fetchPlans } from "../api/plansApi";

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
    "members/add",
    async(payload, thunkAPI) => {
        try {
            return await addPlans(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// //Delete the Member

// export const deleteById = createAsyncThunk(
//   "members/delete",

//   async (id, thunkAPI) => {
//     try {
//       await deleteMember(id);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// //Update the Member

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

// //View a member

// export const viewFeature = createAsyncThunk(
//   "members/view",
//   async (id, thunkAPI) => {
//     try {
//       return await viewMembers(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
      //Fetching members
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

    // //For delete
    //   .addCase(deleteById.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.members = state.members.filter(
    //       (member) => member.id !== action.payload
    //     );
    //     state.allMembers = state.allMembers.filter(
    //       (member) => member.id !== action.payload
    //     );
    //   })
    //   .addCase(deleteById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

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

    //    //For view
    // .addCase(viewFeature.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(viewFeature.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.selectedMember = action.payload;
    //   })
    //   .addCase(viewFeature.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //For Search
    //   .addCase(searchFeature.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(searchFeature.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.members = action.payload;
    //   })
    //   .addCase(searchFeature.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

   

   

    
  },
});

export default plansSlice.reducer;
