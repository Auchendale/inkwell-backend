exports.getItemID = async (collection) => {
  const items = await collection.find()
  return items[0]._id
}



