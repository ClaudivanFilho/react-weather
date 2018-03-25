export function fetchRequestMock() {
  return new Promise((resolve, reject) => {
    process.nextTick(
      resolve('success')
    );
  });
}