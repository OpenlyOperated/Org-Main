const chai = require("chai");
chai.use(require("chai-http"));
const server = require("../app");

const Constants = require('./constants.js');

var agent = chai.request.agent(server);

module.exports = {
  
  agent: agent,

  resetAgent: () => {
    if (agent) {
      agent.close();
      agent = chai.request.agent(server);
    }
  },
  
  getUrl: (url, params = {}) => {
    return agent
      .get(url)
      .query(params);
  },
  
  postUrl: (url, params = {}) => {
    return agent
      .post(url)
      .send(params);
  }
  
}