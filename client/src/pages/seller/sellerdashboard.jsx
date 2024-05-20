// Dashboard.js

import { useFirebase } from './/../../utils/context'; // Ensure this path is correct

function Dashboard() {
  const { currentUser } = useFirebase();

  return (
    <div>
      <h1>User: {currentUser ? currentUser.uid : "Not logged in"}</h1>
    </div>
  );
}

export default Dashboard;
