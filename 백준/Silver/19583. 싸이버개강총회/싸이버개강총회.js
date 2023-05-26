  const fs = require("fs");
  const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
  const [eventStartTime, eventEndTime, streamEndTime] = input.shift().split(" ").map((el) => el.split(":").map(Number).reduce((a, b) => a * 100 + b));
  const attendance = new Set();
  let count = 0;

  function solve() {
    const log = [];

    input.forEach((str) => {
      const [time, id] = str.split(" ");
      const curr = time.split(":").map(Number).reduce((a, b) => a * 100 + b);

      if (curr <= eventStartTime)
        attendance.add(id);
      else if (curr >= eventEndTime && curr <= streamEndTime && attendance.has(id)) {
        count += 1;
        attendance.delete(id);
      }
    });
  }

  solve();
  console.log(count);