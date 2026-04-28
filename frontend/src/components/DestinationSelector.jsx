function DestinationSelector({
  destinations,
  selectedDestination,
  onChange,
}) {
  return (
    <label className="field-group">
      <span>Destination</span>
      <select
        value={selectedDestination}
        onChange={(event) => onChange(event.target.value)}
      >
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default DestinationSelector;
