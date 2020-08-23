import reactotron from 'reactotron-react-native';

export const fetchScore = async () => {
  const response = await delay(1000, score());
  const scoreData = response.status === 200 ? response.data : [];
  return scoreData;
};

export const uploadScore = async ({newScore}) => {
  const response = await delay(1000, uploaded(newScore));
  return response;
};

const uploaded = data => {
  return {
    status: 200,
    data: data,
  };
};

const score = () => {
  return {
    status: 200,
    data: [
      {player: 'player1', score: 30},
      {player: 'player2', score: 40},
      {player: 'player3', score: 50},
      {player: 'player3', score: 10},
    ],
  };
};

const delay = (time, mock) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mock);
    }, time);
  });
};
