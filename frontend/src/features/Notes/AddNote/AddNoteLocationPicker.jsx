import LocationPicker from '@common/Location/LocationPicker';

export default function AddNoteLocationPicker({ subtitle, location, setLocation, editMode, displayLocationPicker }) {
  return displayLocationPicker ? (
    <LocationPicker subtitle={subtitle} location={location} onLocationChange={setLocation} editMode={editMode} />
  ) : null;
}
