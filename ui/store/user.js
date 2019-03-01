const PASSWORD_RESET_PENDING = 'PASSWORD_RESET_PENDING';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';

function createErrorList(e) {
  const unknownError = 'Unknown error occured! Please contact site admin.';
  let errors = [];

  if (!e) {
    errors.push(unknownError);
  } else {
    if (e.response && e.response.data && e.response.data.errors) {
      errors = e.response.data.errors;
    } else {
      if (typeof e.message === 'string' && e.message) {
        errors.push(e.message);
      }
      if (typeof e.stack === 'string' && e.stack) {
        errors.push(e.stack);
      }

      if (!errors.length) {
        errors.push(unknownError);
      }
    }
  }

  return errors;
}

export const state = () => ({
  password: null,
  resetToken: null,
  pending: false
});


export const getters = {
  isPending: (state) => {
    return state.pending;
  },
  password: (state) => {
    return state.password;
  },
  resetToken: (state) => {
    return state.resetToken;
  }
};

export const mutations = {
  [PASSWORD_RESET_PENDING](state) {
    state.pending = true;
  },
  [PASSWORD_RESET_SUCCESS](state, value) {
    // state.sessionExpiresAt = value.exp;
    state.pending = false;
  },
  [PASSWORD_RESET_FAILURE](state, payload) {
    state.pending = false;
  }
};

export const actions = {
  async changePassword({ commit }, credentials) {
    commit(PASSWORD_RESET_PENDING);
    try {
      const endpoint = '/password_resets/reset';
      const responseData = await this.$axios.$post(endpoint, credentials);
      commit(PASSWORD_RESET_SUCCESS, responseData);
      return responseData;
    } catch (e) {
      console.error('changePassword failed', e);
      commit(PASSWORD_RESET_FAILURE, 'password reset failed');
      throw createErrorList(e);
    }
  }
};
