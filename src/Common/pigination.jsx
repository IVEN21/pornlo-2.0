export default function pigination(database, pageSize, currentPage) {
  const initail = (currentPage - 1) * pageSize;
  const final = pageSize * currentPage - 1;
  const newMovie = [];
  if (final < database.length) {
    for (let i = initail; i <= final; i++) {
      newMovie[i] = database[i];
    }
  } else {
    for (let i = initail; i < database.length; i++) {
      newMovie[i] = database[i];
    }
  }

  return newMovie;
}
