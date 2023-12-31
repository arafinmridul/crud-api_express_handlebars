const express = require("express");
const uuid = require("uuid"); // to generate random id
const router = express.Router();
const { members } = require("../../Members");

const idFilter = (req) => (member) => {
  const id = parseInt(req.params.id);
  return member.id === id;
};

// gets all members
router.get("/", (req, res) => res.json(members));

// gets single member
router.get("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) res.json(members.filter(idFilter(req)));
  else {
    // bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// create member
router.post("/", (req, res) => {
  // Headers "content-type: application/json"
  const newMember = {
    ...req.body,
    id: uuid.v4(), // version 4 method generates random id
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  }

  members.push(newMember);
  res.json(members);
  //  res.redirect("/");
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    members.forEach((member, i) => {
      if (idFilter(req)(member)) {
        // overlapping properties will be overwritten
        const updMember = { ...member, ...req.body };
        members[i] = updMember;

        res.json({ msg: "Member updated", member: updMember });
      }
    });
  } else {
    // bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// delete member
router.delete("/:id", (req, res) => {
  const found = members.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Member deleted",
      // filter out the member with the id
      members: members.filter((member) => !idFilter(req)(member)),
    });
  } else {
    // bad request
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
