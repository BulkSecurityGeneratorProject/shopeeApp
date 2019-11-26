// import { BASE_IMG_URL, GET_INPUT_COMMON_DATA } from 'app/config/constants';

import { CONSTANTS } from 'app/config/constants';

const ACTION_TYPES = {
  SET_INPUT_VALUE: 'InputCommon/SET_INPUT_VALUE',
  SET_VALIDATE_INPUT: 'InputCommon/SET_VALIDATE_INPUT',
  COPY_DATA_TO_INPUT: 'InputCommon/COPY_DATA_TO_INPUT',
  COPY_REQUIRED_DATA_TO_INPUT: 'InputCommon/COPY_REQUIRED_DATA_TO_INPUT',
  CLEAR_FORM: 'InputCommon/CLEAR_FORM',
  RESET: 'InputCommon/RESET'
};

const initialState = {
  inputValue: {},
  invalidFields: {},
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type InputCommonState = Readonly<typeof initialState>;

// Reducer
export default (state: InputCommonState = initialState, action): InputCommonState => {
  switch (action.type) {
    case ACTION_TYPES.SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          [ action.formType ]: {
            ...state.inputValue[ action.formType ],
            [ action.field ]: action.value
          }
        }
      };
    case ACTION_TYPES.SET_VALIDATE_INPUT:
      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [ action.formType ]: {
            ...state.invalidFields[ action.formType ],
            [ action.field ]: action.error
          }
        }
      };
    case ACTION_TYPES.CLEAR_FORM:
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          [ action.formType ]: {}
        },
        invalidFields: {
          ...state.invalidFields,
          [ action.formType ]: {}
        }
      };
    case ACTION_TYPES.COPY_DATA_TO_INPUT:
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          [ action.formType ]: {
            ...state.inputValue[ action.formType ],
            ...action.data
          }
        },
        invalidFields: {
          ...state.invalidFields,
          [ action.formType ]: {}
        }
      };
    case ACTION_TYPES.COPY_REQUIRED_DATA_TO_INPUT:
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          [ action.formType ]: {
            ...state.inputValue[ action.formType ],
            ...action.data
          }
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const setInputValue = (formType, field, value) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_INPUT_VALUE,
    formType,
    field,
    value
  });
};

export const setInvalidField = (formType, field, error) => ({
  type: ACTION_TYPES.SET_VALIDATE_INPUT,
  formType,
  field,
  error
});

export const validateInputValue = (formType, fieldValue, fieldDefine) => async (dispatch, getState) => {
  const { fieldName, required, validPattern, invalidPattern, invalidMessage } = fieldDefine;
  if (!fieldValue && required) {
    dispatch(setInvalidField(formType, fieldName, CONSTANTS.FORM_ERROR.EMPTY_ERROR));
  } else if (
    (validPattern && !new RegExp(validPattern).test(fieldValue)) ||
    (invalidPattern && new RegExp(invalidPattern).test(fieldValue))) {
    dispatch(setInvalidField(formType, fieldName, invalidMessage));
  } else {
    dispatch(setInvalidField(formType, fieldName, CONSTANTS.FORM_ERROR.VALID));
  }
};

export const validateForm = (formType, formDefine, isOnlyCheck = false) => async (dispatch, getState) => {
  const formInputValue = getState().inputCommon.inputValue[ formType ];
  let validData = true;
  formDefine.map(field => {
    const fieldValue = formInputValue && formInputValue[ field.fieldName ] ? formInputValue[ field.fieldName ] : '';
    let errorMessage = CONSTANTS.FORM_ERROR.VALID;
    if (field.required && !fieldValue) {
      validData = false;
      errorMessage = CONSTANTS.FORM_ERROR.EMPTY_ERROR;
    } else if (
      (field.validPattern && !new RegExp(field.validPattern).test(fieldValue)) ||
      (field.invalidPattern && new RegExp(field.invalidPattern).test(fieldValue))
    ) {
      validData = false;
      errorMessage = field.invalidMessage;
    }
    dispatch(setInvalidField(formType, field.fieldName, errorMessage));
  });
  return validData;
};

export const copyDataToInput = (formType, data) => ({
  type: ACTION_TYPES.COPY_DATA_TO_INPUT,
  formType,
  data
});

export const copyRequireDataToInput = (formType, data) => ({
  type: ACTION_TYPES.COPY_REQUIRED_DATA_TO_INPUT,
  formType,
  data
});

export const clearForm = formType => ({
  type: ACTION_TYPES.CLEAR_FORM,
  formType
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
