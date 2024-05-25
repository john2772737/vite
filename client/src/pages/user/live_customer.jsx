import React from 'react'
import { useFirebase } from '../../utils/usercontext'

const live_customer = () => {

  const { currentUser } = useFirebase();
  const currentUserUid = currentUser.uid;
  return (
    <div>
      <h1>{currentUserUid}</h1>
    </div>
  )
}

export default live_customer
