import {RootState} from "../../../store/"

export const selectAllXits = (state: RootState) => state.xits;


export const selectXitById = (id: string) => (state: RootState) =>
    state.xits.find((x) => x.id === id);