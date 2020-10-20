/* eslint-disable */
const filterOptionsFunction = (results, term, selectedOptions) => {
  return results.filter(
    option => !selectedOptions.find(selectedOption => selectedOption.value === option.value)
  )
}
