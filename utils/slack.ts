import axios from "axios";

const sendMessage = async (webhookUrl: string, payload: unknown) => {
  if (webhookUrl === "") return;
  const response = await axios.post(webhookUrl, JSON.stringify(payload), {
    withCredentials: false,
    transformRequest: [
      (data, headers) => {
        delete headers?.["Content-Type"];
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
