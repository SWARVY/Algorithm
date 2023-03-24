function solution(sizes) {
  let left_max = 0;
  let right_max = 0;

  for (let i = 0; i < sizes.length; i++) sizes[i].sort((a, b) => a - b);
  sizes.forEach((el) => {
    if (el[0] > left_max) left_max = el[0];
    if (el[1] > right_max) right_max = el[1];
  });
  return left_max * right_max;
}