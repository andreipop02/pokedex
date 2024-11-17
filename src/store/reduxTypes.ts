import { Action, AsyncThunk } from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;

export function isFulfilledAction(action: Action): action is FulfilledAction {
  return action.type.endsWith("/fulfilled");
}

export function isPendingAction(action: Action): action is PendingAction {
  return action.type.endsWith("/pending");
}

export function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith("/rejected");
}

interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

interface RejectedAction {
  type: string;
  payload: undefined;
  error: SerializedError | any;
  meta: {
    requestId: string;
    arg: string;
    aborted: boolean;
    condition: boolean;
  };
}
