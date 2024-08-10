import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      username: ''
    },
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
    userRole: '' // New property for storing the user role
  },
  mutations: {
    initializeStore(state) {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      state.token = token || '';
      state.isAuthenticated = !!token;
      state.userRole = userRole || '';
      state.user = {}; // Ensure user is an empty object if not authenticated
    },
    setToken(state, { token, role }) {
      state.token = token;
      state.isAuthenticated = true;
      state.userRole = role;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // Save user role to localStorage
    },
    setUser(state, userData) {
      state.user = userData;
    },
    removeToken(state) {
      state.token = '';
      state.isAuthenticated = false;
      state.userRole = '';
      state.user = {}; // Clear user data
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
  },  
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/v1/token/login/', credentials);
        const token = response.data.auth_token;
        const userRole = response.data.userRole; // Adjust if necessary
  
        commit('setToken', { token, role: userRole });
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  
        const userResponse = await axios.get(`/api/v1/users/${credentials.username}`);
        commit('setUser', userResponse.data);
  
        return userResponse.data;
      } catch (error) {
        commit('removeToken');
        throw error;
      }
    }
  },
  modules: {
  }
})