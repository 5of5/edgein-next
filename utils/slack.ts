import axios from 'axios';

const sendMessage = async (webhookUrl: string, _payload: unknown) => {
  if (webhookUrl === '') return;
  let payload = _payload;
  if (typeof _payload === 'string') {
    payload = {
      text: _payload,
    };
  }
  const response = await axios.post(webhookUrl, JSON.stringify(payload), {
    withCredentials: false,
    transformRequest: [
      (data, headers) => {
        delete headers?.['Content-Type'];
        return data;
      },
    ],
  });

  return response;
};

const SlackServices = {
  sendMessage,
};

export default SlackServices;
