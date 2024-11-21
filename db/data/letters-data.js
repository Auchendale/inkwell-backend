const letters = [
  {
    sender: "sam",
    recipient: "oscar",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },
    date_sent: Date.now()+5,
    is_opened: true
  },
  {
    sender: "sam",
    recipient: "kieran",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },
    date_sent: Date.now()+5000000
  },
  {
    sender: "oscar",
    recipient: "kev",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },
    date_sent: Date.now()+100000000  },
  {
    sender: "kieran",
    recipient: "sam",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },
    date_sent: Date.now()+900000000,
    is_opened: true,
    is_saved: true  },
  {
    sender: "kieran",
    recipient: "charlie",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },  },
  {
    sender: "charlie",
    recipient: "upender",
    content: {
      letter:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Old_Letter.jpg",
    },
    date_sent: Date.now()-900000000,
    is_opened: true,
    is_saved: true   },
];

module.exports = letters;
