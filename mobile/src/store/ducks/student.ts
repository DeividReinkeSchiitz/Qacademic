import { studentI } from '../../common/types';

//types
const Types = {
  ADD: 'STUDENT/ADD',
  REMOVE: 'STUDENT/REMOVE',
};

//reducers

export default function counter(state: studentI | '' = '', action: any) {
  switch (action.type) {
    case Types.ADD:
      return action.data;

    case Types.REMOVE:
      return '';
    default:
      return state;
  }
}

//action creator
export const remove = () => ({ type: Types.REMOVE, login: '' });

export const add = (data: string) => ({
  type: Types.ADD,
  data,
});
