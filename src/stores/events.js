import { getEvents, createEvent } from '../apiHelpers';


const events = {
  namespaced: true,

  state: {
    events: {},
    userEvents: {},
  },

  getters: {
    /**
     * Gets the events
     * @retuns List of events
     */
    getEvents: state => (
      state.events
    ),

    /**
     * Gets the popular events
     * @retuns List of events
     */
    getPopularEvents: state => (
      state.events.popular
    ),

    /**
     * Gets the recommended events
     * @retuns List of events
     */
    getRecommendedEvents: state => (
      state.events.recommended
    ),

    /**
     * Gets the events closes to user location
     * @retuns List of events
     */
    getLocationEvents: state => (
      state.events.location
    ),
  },

  mutations: {
    /**
     * Get the popular events
     * @returns {void}
     */
    popularEvents: (state, popularEvents) => {
      state.events.popular = popularEvents;
    },

    /**
     * Get the recommended events
     * @returns {void}
     */
    recommendedEvents: (state, recommendedEvents) => {
      state.events.recommended = recommendedEvents;
    },

    /**
     * Get the events close to users location
     * @returns {void}
     */
    locationEvents: (state, locationEvents) => {
      state.events.location = locationEvents;
    },
  },

  actions: {
    /**
     * make api call for events
     * @param {Object} commit: used to commit mutations to state
     * @param {String} category: category of events to retur
     *
     * @returns {void}
     */
    fetchEvents({ dispatch, commit }, { category }) {
      if (category) {
        return getEvents(category)
          .then(({ events: categoryEvents }) => {
            commit(`${category}Events`, categoryEvents);
          })
          .catch(({ response: { data: { error } } }) => {
            if (error === 'not authenticated') {
              dispatch('account/logout', null, { root: true });
            }
            commit('error/eventsError', error, { root: true });
          });
      }
      return getEvents()
        .then(({ popular, location, recommended }) => {
          commit('popularEvents', popular);
          commit('locationEvents', location);
          commit('recommendedEvents', recommended);
        })
        .catch(({ response: { data: { error } } }) => {
          commit('error/eventsError', error, { root: true });
        });
    },

    /**
     * make api call to create event
     * @param {Object} userDetails
     *
     * @return {void}
     */
    createEvent({ commit }, { eventDetails }) {
      return createEvent(eventDetails)
        .then(({ event }) => {
          commit('userEvent', event);
        })
        .catch((error) => {
          commit('error/eventsError', error, { root: true });
        });
    },
  },
};

export default events;

