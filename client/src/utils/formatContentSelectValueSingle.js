export const formatContentSelectValueSingle = obj => {
  console.log('OBBBJ ', obj)
  return {
    value: (obj || {}).id || (obj || {}).value,
    label: (obj || {}).ca_aco_ticker || (obj || {}).label
  }
}

export default formatContentSelectValueSingle