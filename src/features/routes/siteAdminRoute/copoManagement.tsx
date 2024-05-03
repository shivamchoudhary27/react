import { Route } from 'react-router-dom'
import CoPoManagement from '../../../pages/siteAdminstration/copoManagement'
import CoPoCourseManagment from '../../../pages/siteAdminstration/copoManagement/manageCourse'
import CopoTabsList from '../../../pages/siteAdminstration/copoManagement/tabsIndex'

const CoPoManagementRoute = () => {
  return [
    <Route key='copomanagement' path='/copomanagement' element={<CoPoManagement />} />,
    <Route key='copoCourse' path='/copoCourse/:id/:name' element={<CoPoCourseManagment />} />,
    <Route key='tabsList' path='/tabsList/:id/:name' element={<CopoTabsList />} />,   

  ]
}

export default CoPoManagementRoute