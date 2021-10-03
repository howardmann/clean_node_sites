const _serializeSingle = (site) => {
  return {
    'id': site.id,
    'name': site.name,
    'state': site.state
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}

module.exports = serializer