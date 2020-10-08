import { makeQueryString } from '../utils';

// Register your redux store under a unique namespace
export const namespace = 'bedstuystrong-ticket';

const API_BASE = 'http://localhost:5001/bedstuystrong-automation-a4b75/us-central1';

const ACTION_GET_TICKETS_FOR_PHONE_NUMBER = 'GET_TICKETS_FOR_PHONE_NUMBER';

const initialState = {
  tickets: {},
  isLoading: false,
};

const getTicketsForPhoneNumber = (phoneNumber, accountSid) => {
  const params = makeQueryString({
    phoneNumber,
    accountSid,
  });
  return fetch(`${API_BASE}/api-findTicketsByPhoneNumber?${params}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    });
}

export const Actions = {
  // This action's payload is a function that will return a promise
  // It's payload will resolve to a Promise
  getTickets: (phoneNumber, accountSid) => ({
    type: ACTION_GET_TICKETS_FOR_PHONE_NUMBER,
    payload: getTicketsForPhoneNumber(phoneNumber, accountSid),
  }),
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    // Describe how to handle the Promise while its pending
    case `${ACTION_GET_TICKETS_FOR_PHONE_NUMBER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };
    // Describe how to handle the Promise if it's successfully fulfilled
    case `${ACTION_GET_TICKETS_FOR_PHONE_NUMBER}_FULFILLED`:
      const tickets = Object.fromEntries(action.payload.map((ticket) => [ticket.ticketID, ticket]));
      console.log({tickets})
      return {
        ...state,
        isLoading: false,
        tickets: {...state.tickets, ...tickets},
      };
    // Describe how to handle the promise if it fails
    case `${ACTION_GET_TICKETS_FOR_PHONE_NUMBER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
