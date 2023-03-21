import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import apiSlice from '../../app/api/apiSlice';

const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => {
  //   return a.status === b.status ? 0 : a.status ? 1 : -1;
  // },
});

const initialState = todosAdapter.getInitialState();

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: '/todo',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (data) => {
        const transformed = data.map((todo) => {
          todo.id = todo._id;
          return todo;
        });
        return todosAdapter.setAll(initialState, transformed);
      },
      providesTags: (result, error, arg) => {
        return [
          { type: 'Todo', id: 'List' },
          ...result.ids.map((id) => {
            return { type: 'Todo', id };
          }),
        ];
      },
    }),
    updateTodo: builder.mutation({
      query: (updatedTodo) => ({
        url: '/todo',
        method: 'PUT',
        body: {
          ...updatedTodo,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
    }),
    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todo',
        method: 'POST',
        body: {
          ...newTodo,
        },
      }),
      invalidatesTags: [{ type: 'Todo', id: 'List' }],
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: '/todo',
        method: 'DELETE',
        body: {
          todoId,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
    }),
    toggleStatus: builder.mutation({
      query: (todoId) => ({
        url: '/todo',
        method: 'PATCH',
        body: {
          todoId,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApiSlice.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.entities[arg];
            if (todo) {
              todo.status = !todo.status;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useToggleStatusMutation,
} = todosApiSlice;

export const selectTodosResult = todosApiSlice.endpoints.getTodos.select();

const selectTodoData = createSelector(selectTodosResult, (todoResult) => {
  return todoResult.data;
});

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state) => selectTodoData(state) ?? initialState);
