export default (user, history, callback) => {
  if (!user || user.code) {
    return history.push({
      pathname: '/error',
      state: { ...user } });
  }
  if (user.profile) {
    callback(user);
    if (user.profile === 'admin') history.push('/admin/');
    if (user.profile === 'director') history.push('/director');
    if (user.profile === 'teacher') history.push('/teacher');
  }
};
