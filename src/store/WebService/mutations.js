export function setIdentity(state, { key, token, role, expTime }) {
  state.key = key;
  state.token = token;
  state.role = role;
  state.expTime = expTime;
}
