export default (data) => {

  return data.reduce((results, item) => {
    let incident = item.title.split(", ").slice(1)[0];
    results[incident].amount = results[incident] + 1
    return results
  }, {})
}