export default ({ $axios, store, redirect }) => {
  $axios.onRequest((config) => {
    // can do stuff here
  });

  $axios.onError((error) => {
    console.log(error);
  });
};
