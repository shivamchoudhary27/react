import React from 'react'
import { Route } from 'react-router-dom'
import CoPoManagement from '../../../pages/siteAdminstration/copoManagement'

const CoPoManagementRoute = () => {
  return [
    <Route key='copomanagement' path='/copomanagement' element={<CoPoManagement />} />
  ]
}

export default CoPoManagementRoute