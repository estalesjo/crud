var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var should = chai.should();

chai.use(chaiHttp);
describe("crud operations", function() {
  var messeges = [
    {
      author: "emma",
      message: "hej"
    }
  ];

  it("should add message in DB", done => {
    for (messege in messeges) {
      chai
        .request("http://localhost:3000")
        .post("/crud")
        .send(messeges[messege])
        .end((err, res) => {
          console.log("Response: ", res.body);
          done();
        });
    }
  });
  it("should fetch all messages", done => {
    chai
      .request("http://localhost:3000")
      .get("/crud")
      .end((err, res) => {
        console.log("All from db: ", res.body);
        res.should.be.json;
        done();
      });
  });

  var updateMessages = [
    {
      id: "34",
      message: "hej",
      author: "emma"
    }
  ];
  it("should update a particular message or name", done => {
    for (updateMessage in updateMessages) {
      chai
        .request("http://localhost:3000")
        .put("/crud")
        .send(updateMessages[updateMessage])
        .end((err, res) => {
          console.log("Response: ", res.body);
          done();
        });
    }
  });

  it("should delete a particular message in DB", done => {
    var deleteMessages = [
      {
        id: "42"
      }
    ];
    for (deleteMessage in deleteMessages) {
      chai
        .request("http://localhost:3000")
        .delete("/crud")
        .send(deleteMessages[deleteMessage])
        .end((err, res) => {
          console.log("Deleted: ", res.body);
          done();
        });
    }
  });
});
