const config = {
  api: {
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 30000,
    // withCredentials: true
  },
  acceptedFileExtentions: '.png,.docx,.jpg,.jpeg,.pdf,.doc,.xls,.xlsx',
};
export const chatconfig = {
  api: {
    baseURL: process.env.REACT_APP_BASE_CHAT_URL,
    timeout: 30000,
    // withCredentials: true
  },
  acceptedFileExtentions: '.png,.docx,.jpg,.jpeg,.pdf,.doc,.xls,.xlsx',
};
export default config;
