import React, { useState, useEffect } from 'react';

const IQAgentMiddleware = () => {
  const [roomAvailability, setRoomAvailability] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [academicYear, setAcademicYear] = useState('2023-24');
  const [roomLocationId, setRoomLocationId] = useState('13');
  const [roomTypeId, setRoomTypeId] = useState('172');
  const [lookupEntity, setLookupEntity] = useState('roomlocation');

  const fetchRoomAvailability = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://your-cloud-function-url/your-region/proxyRequest?path=/api/v1/room/${academicYear}/${roomLocationId}`);
      const data = await response.json();
      setRoomAvailability(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://your-cloud-function-url/your-region/proxyRequest?path=/api/v2/utility/promocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rm_loc_id: roomLocationId, rm_type_id: roomTypeId, ay: academicYear })
      });
      const data = await response.json();
      setPromoCodes(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fetchLookupData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://your-cloud-function-url/your-region/proxyRequest?path=/api/v1/lookup/${lookupEntity}`);
      const data = await response.json();
      setLookupData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoomAvailability();
    fetchPromoCodes();
    fetchLookupData();
  }, [academicYear, roomLocationId, roomTypeId, lookupEntity]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'academicYear':
        setAcademicYear(value);
        break;
      case 'roomLocationId':
        setRoomLocationId(value);
        break;
      case 'roomTypeId':
        setRoomTypeId(value);
        break;
      case 'lookupEntity':
        setLookupEntity(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>IQ Agent Middleware</h2>
      <div>
        <label htmlFor="academicYear">Academic Year:</label>
        <input
          type="text"
          id="academicYear"
          name="academicYear"
          value={academicYear}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="roomLocationId">Room Location ID:</label>
        <input
          type="text"
          id="roomLocationId"
          name="roomLocationId"
          value={roomLocationId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="roomTypeId">Room Type ID:</label>
        <input
          type="text"
          id="roomTypeId"
          name="roomTypeId"
          value={roomTypeId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="lookupEntity">Lookup Entity:</label>
        <input
          type="text"
          id="lookupEntity"
          name="lookupEntity"
          value={lookupEntity}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={fetchRoomAvailability}>Get Room Availability</button>
      <button onClick={fetchPromoCodes}>Get Promo Codes</button>
      <button onClick={fetchLookupData}>Get Lookup Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {roomAvailability.length > 0 && (
        <div>
          <h3>Room Availability</h3>
          <ul>
            {roomAvailability.map((room, index) => (
              <li key={index}>
                <p>Room Type: {room.RoomTypeDescription}</p>
                <p>Amount: {room.Amount}</p>
                <p>Number of Rooms: {room.NumberOfRooms}</p>
                {/* Add more properties as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {promoCodes.length > 0 && (
        <div>
          <h3>Promo Codes</h3>
          <ul>
            {promoCodes.map((code, index) => (
              <li key={index}>
                <p>Promotion Code: {code.promotionCode}</p>
                <p>Promotion Description: {code.promotionDescription}</p>
                <p>Promotion Value: {code.promotionValue}</p>
                {/* Add more properties as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lookupData.length > 0 && (
        <div>
          <h3>Lookup Data</h3>
          <ul>
            {lookupData.map((item, index) => (
              <li key={index}>
                <p>Lookup Value: {item.Lookup_Value}</p>
                <p>Lookup Text: {item.Lookup_Text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IQAgentMiddleware;
