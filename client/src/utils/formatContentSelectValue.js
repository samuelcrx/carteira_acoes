export const formatContentSelectValue = values => {
  if (values && values.map) {
    return values.map(item => ({
      value: (item || {}).id || (item || {}).value,
      label: (item || {}).ca_aco_ticker || (item || {}).label || (item || {}).descricao
    }))
  } else {
    return []
  }
}

export default formatContentSelectValue