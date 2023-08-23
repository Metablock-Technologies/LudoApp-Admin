import React, { useState } from 'react';

const EditPermission = () => {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    location: false,
    notifications: false,
  });

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };

  return (
    <div style={{marginTop:"20%"}}>
      <h2>Permissions</h2>
      <label>
        <input
          type="checkbox"
          checked={permissions.camera}
          onChange={() => handlePermissionChange('camera')}
        />
        Camera
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={permissions.microphone}
          onChange={() => handlePermissionChange('microphone')}
        />
        Microphone
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={permissions.location}
          onChange={() => handlePermissionChange('location')}
        />
        Location
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={permissions.notifications}
          onChange={() => handlePermissionChange('notifications')}
        />
        Notifications
      </label>
    </div>
  );
};

export default EditPermission;
