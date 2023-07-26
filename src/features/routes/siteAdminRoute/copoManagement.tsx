import React from 'react'
import { Route } from 'react-router-dom'
import CoPoManagement from '../../../pages/siteAdminstration/copoManagement'

const CoPoManagementRoute = () => {
  return [
    <Route path='/copomanagement' element={<CoPoManagement />} />
  ]
}

export default CoPoManagementRoute