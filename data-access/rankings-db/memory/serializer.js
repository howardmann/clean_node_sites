const _serializeSingle = (ranking) => {
  return {
    'id': ranking.id,
    'rank': ranking.rank,
    'group_id': ranking.group_id,
    'site_id': ranking.site_id,
    'month_end': ranking.month_end
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


