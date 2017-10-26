let config = {
  api: {
    url: 'http://dev.vivintsolar.com:3001/session-tracker'
  }
};

if(process.env.NODE_ENV === 'production') {
  config = {
    api: {
      url: 'https://session-tracker-backend.herokuapp.com/session-tracker'
    }
  };
}

export default config;
